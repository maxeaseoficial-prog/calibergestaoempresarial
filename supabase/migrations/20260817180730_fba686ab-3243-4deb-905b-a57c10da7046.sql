
  UPDATE public.site_settings 
  SET value = 'leonardo.froese@gmail.com' 
  WHERE key = 'lead_recipient_email' 
  AND NOT EXISTS (SELECT 1 FROM public.site_settings WHERE key = 'lead_recipient_email');
  
  INSERT INTO public.site_settings (key, value)
  SELECT 'lead_recipient_email', 'leonardo.froese@gmail.com'
  WHERE NOT EXISTS (SELECT 1 FROM public.site_settings WHERE key = 'lead_recipient_email');
