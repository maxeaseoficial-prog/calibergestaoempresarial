import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';

export function useSeoSettings(path: string) {
  return useQuery({
    queryKey: ['seo', path],
    queryFn: async () => {
      // Use any to bypass strict type checking for dynamic schema fields
      const { data, error } = await (supabase.from('seo_settings') as any)
        .select('*')
        .eq('page_path', path)
        .single();
      if (error) return null;
      return data;
    },
    staleTime: 1000 * 60 * 60, // 1 hour
  });
}
