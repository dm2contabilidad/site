'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { leadSchema, type LeadFormData } from '@/lib/validation';
import { getUTMs, getReferrer, captureUTMs } from '@/lib/utm';
import { analytics, metaPixel } from '@/lib/analytics';
import { submitLead, type SubmitResult } from '@/app/contato/action';
import { Input } from '@/components/ui/Input';
import { Textarea } from '@/components/ui/Textarea';
import { Select } from '@/components/ui/Select';
import { Button } from '@/components/ui/Button';
import { SERVICE_OPTIONS } from '@/lib/constants';

const TURNSTILE_SITE_KEY = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY;

export function ContactForm() {
  const router = useRouter();
  const [submitting, setSubmitting] = useState(false);
  const [serverError, setServerError] = useState<string | null>(null);
  const [turnstileToken, setTurnstileToken] = useState('');
  const turnstileRef = useRef<HTMLDivElement>(null);
  const formStarted = useRef(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm<LeadFormData>({
    resolver: zodResolver(leadSchema),
  });

  // Capture UTMs on mount
  useEffect(() => {
    captureUTMs();
  }, []);

  // Load Turnstile widget
  useEffect(() => {
    if (!TURNSTILE_SITE_KEY || !turnstileRef.current) return;

    const renderWidget = () => {
      const w = window as Window & {
        turnstile?: {
          render: (el: HTMLElement, opts: Record<string, unknown>) => void;
        };
      };
      if (w.turnstile && turnstileRef.current) {
        w.turnstile.render(turnstileRef.current, {
          sitekey: TURNSTILE_SITE_KEY,
          callback: (token: string) => setTurnstileToken(token),
          theme: 'light',
          size: 'flexible',
        });
      }
    };

    // Check if script already loaded
    if (document.querySelector('script[src*="turnstile"]')) {
      renderWidget();
      return;
    }

    const script = document.createElement('script');
    script.src = 'https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit';
    script.async = true;
    script.onload = renderWidget;
    document.head.appendChild(script);
  }, []);

  // Track form_start on first interaction
  const handleFormStart = useCallback(() => {
    if (!formStarted.current) {
      formStarted.current = true;
      analytics.formStart('/contato');
    }
  }, []);

  const onSubmit = async (data: LeadFormData) => {
    setSubmitting(true);
    setServerError(null);

    // In dev without Turnstile, allow submission
    const token = turnstileToken || (TURNSTILE_SITE_KEY ? '' : 'dev-bypass');

    if (TURNSTILE_SITE_KEY && !token) {
      setServerError('Aguarde a verificação de segurança e tente novamente.');
      setSubmitting(false);
      return;
    }

    const utms = getUTMs();
    const referrer = getReferrer();

    const result: SubmitResult = await submitLead({
      ...data,
      turnstileToken: token,
      honeypot: (document.querySelector<HTMLInputElement>('input[name="website"]'))?.value || '',
      origem_pagina: window.location.pathname,
      referrer: referrer || '',
      utm_source: utms.utm_source || '',
      utm_medium: utms.utm_medium || '',
      utm_campaign: utms.utm_campaign || '',
      utm_content: utms.utm_content || '',
      utm_term: utms.utm_term || '',
    });

    if (result.success) {
      // Track conversion
      analytics.formSubmit('/contato', data.servico_interesse || undefined);
      metaPixel.lead();

      // Redirect to thank you page
      router.push('/obrigado');
    } else {
      // Handle field-level errors
      if (result.fieldErrors) {
        for (const [field, message] of Object.entries(result.fieldErrors)) {
          if (message) {
            setError(field as keyof LeadFormData, { message });
          }
        }
      }
      setServerError(result.error || 'Algo deu errado. Tente novamente.');
      setSubmitting(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      onFocus={handleFormStart}
      className="space-y-5"
      noValidate
    >
      <Input
        label="Seu nome"
        placeholder="Ex: João Silva"
        error={errors.nome?.message}
        {...register('nome')}
      />

      <Input
        label="E-mail"
        type="email"
        placeholder="Ex: joao@empresa.com.br"
        error={errors.email?.message}
        {...register('email')}
      />

      <Input
        label="Telefone com DDD"
        type="tel"
        placeholder="Ex: (11) 99999-0000"
        error={errors.telefone?.message}
        {...register('telefone')}
      />

      <Input
        label="Empresa"
        placeholder="Nome da sua empresa"
        optional
        error={errors.empresa?.message}
        {...register('empresa')}
      />

      <Select
        label="Serviço de interesse"
        options={SERVICE_OPTIONS}
        optional
        error={errors.servico_interesse?.message}
        {...register('servico_interesse')}
      />

      <Textarea
        label="Mensagem"
        placeholder="Como podemos ajudar?"
        optional
        error={errors.mensagem?.message}
        {...register('mensagem')}
      />

      {/* Honeypot — invisible to users */}
      <div className="absolute opacity-0 pointer-events-none h-0 overflow-hidden" aria-hidden="true">
        <input type="text" name="website" tabIndex={-1} autoComplete="off" />
      </div>

      {/* Turnstile widget */}
      {TURNSTILE_SITE_KEY && (
        <div ref={turnstileRef} className="min-h-[65px]" />
      )}

      {/* Server error */}
      {serverError && (
        <div className="p-3 rounded-md bg-error-100 text-error-500 text-sm" role="alert">
          {serverError}
        </div>
      )}

      <Button
        type="submit"
        size="lg"
        disabled={submitting}
        className={`w-full sm:w-auto bg-gold-500 text-navy-900 hover:bg-gold-400 font-semibold ${submitting ? 'opacity-70' : ''}`}
      >
        {submitting ? 'Enviando...' : 'Enviar mensagem'}
      </Button>

      <p className="text-xs text-neutral-400">
        Ao enviar, você concorda com nossa{' '}
        <a href="/privacidade" className="underline hover:text-neutral-600">
          política de privacidade
        </a>.
      </p>
    </form>
  );
}
