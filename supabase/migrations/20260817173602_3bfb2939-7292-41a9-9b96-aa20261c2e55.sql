DO $$ 
BEGIN
    IF NOT EXISTS (
        SELECT 1 FROM pg_description 
        WHERE objoid = 'public.has_role(uuid, public.app_role)'::regprocedure
    ) THEN
        EXECUTE 'GRANT EXECUTE ON FUNCTION public.has_role(uuid, public.app_role) TO authenticated, anon;';
    END IF;
END $$;