-- =============================================
-- DM2 Contabilidade — Leads Table
-- Run this in the Supabase SQL Editor
-- =============================================

CREATE TABLE IF NOT EXISTS leads (
  id              UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  created_at      TIMESTAMPTZ DEFAULT now() NOT NULL,

  -- Lead data
  nome            TEXT NOT NULL CHECK (char_length(nome) >= 2),
  email           TEXT NOT NULL,
  telefone        TEXT NOT NULL CHECK (char_length(telefone) >= 10),
  empresa         TEXT,
  servico_interesse TEXT,
  mensagem        TEXT,

  -- Origin metadata
  origem_pagina   TEXT, -- pathname where the form was submitted
  referrer        TEXT, -- document.referrer captured on first session load
  landing_page    TEXT, -- full URL of the first page hit in the session
  utm_source      TEXT,
  utm_medium      TEXT,
  utm_campaign    TEXT,
  utm_content     TEXT,
  utm_term        TEXT,
  gclid           TEXT, -- Google Ads click ID
  fbclid          TEXT, -- Meta Ads click ID
  user_agent      TEXT,
  ip_hash         TEXT,

  -- Lead management
  status          TEXT DEFAULT 'novo' CHECK (status IN ('novo', 'contactado', 'qualificado', 'descartado', 'convertido')),
  notas           TEXT,
  updated_at      TIMESTAMPTZ DEFAULT now()
);

-- Indexes
CREATE INDEX IF NOT EXISTS idx_leads_created_at ON leads (created_at DESC);
CREATE INDEX IF NOT EXISTS idx_leads_status ON leads (status);
CREATE INDEX IF NOT EXISTS idx_leads_email ON leads (email);

-- Auto-update updated_at on row change
CREATE OR REPLACE FUNCTION update_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS leads_updated_at ON leads;
CREATE TRIGGER leads_updated_at
  BEFORE UPDATE ON leads
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at();

-- =============================================
-- Row Level Security (RLS)
-- Only INSERT allowed via anon key.
-- No SELECT, UPDATE, DELETE from frontend.
-- =============================================

ALTER TABLE leads ENABLE ROW LEVEL SECURITY;

-- Allow anonymous inserts (from the website form)
CREATE POLICY "Allow anonymous insert" ON leads
  FOR INSERT TO anon
  WITH CHECK (true);

-- No SELECT policy for anon = leads cannot be read from frontend
-- Leads are viewed only from Supabase Dashboard or with service_role key

-- =============================================
-- Migration block — safe to re-run
-- Adds the marketing attribution columns to an existing leads table.
-- The CREATE TABLE above already includes them; this block is for
-- environments where the table already exists from an earlier version.
-- =============================================

ALTER TABLE leads
  ADD COLUMN IF NOT EXISTS landing_page TEXT,
  ADD COLUMN IF NOT EXISTS gclid        TEXT,
  ADD COLUMN IF NOT EXISTS fbclid       TEXT;
