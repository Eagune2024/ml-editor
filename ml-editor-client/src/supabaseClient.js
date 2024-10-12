import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://qeeocqxwcfgurxwhhdvp.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFlZW9jcXh3Y2ZndXJ4d2hoZHZwIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Mjg2OTUyMDgsImV4cCI6MjA0NDI3MTIwOH0.ygk1DuwcBvokhdKDTcc-D6g6KrMkLOvhtbgZiKEZqM4'
const supabase = createClient(supabaseUrl, supabaseKey)

export default supabase;