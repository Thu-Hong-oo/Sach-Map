drop extension if exists "pg_net";


  create table "public"."agent_decisions" (
    "id" uuid not null default extensions.uuid_generate_v4(),
    "report_id" uuid,
    "action_type" text,
    "decision" text,
    "confidence" double precision,
    "created_at" timestamp without time zone default now()
      );


alter table "public"."agent_decisions" enable row level security;


  create table "public"."ai_analysis" (
    "id" uuid not null default extensions.uuid_generate_v4(),
    "report_id" uuid,
    "cleanliness_score" double precision,
    "detected_objects" jsonb,
    "confidence" double precision,
    "model_version" text,
    "created_at" timestamp without time zone default now()
      );


alter table "public"."ai_analysis" enable row level security;


  create table "public"."ai_jobs" (
    "id" uuid not null default extensions.uuid_generate_v4(),
    "report_id" uuid,
    "status" text default 'queued'::text,
    "started_at" timestamp without time zone,
    "finished_at" timestamp without time zone
      );


alter table "public"."ai_jobs" enable row level security;


  create table "public"."media" (
    "id" uuid not null default extensions.uuid_generate_v4(),
    "report_id" uuid,
    "uploader_id" uuid,
    "file_url" text not null,
    "media_type" text,
    "created_at" timestamp without time zone default now()
      );


alter table "public"."media" enable row level security;


  create table "public"."notifications" (
    "id" uuid not null default extensions.uuid_generate_v4(),
    "user_id" uuid,
    "title" text,
    "content" text,
    "is_read" boolean default false,
    "created_at" timestamp without time zone default now()
      );


alter table "public"."notifications" enable row level security;


  create table "public"."places" (
    "id" uuid not null default extensions.uuid_generate_v4(),
    "name" text,
    "latitude" numeric(9,6),
    "longitude" numeric(9,6),
    "address" text,
    "city" text,
    "district" text,
    "ward" text,
    "created_at" timestamp without time zone default now()
      );


alter table "public"."places" enable row level security;


  create table "public"."profiles" (
    "id" uuid not null,
    "display_name" text,
    "phone" text,
    "avatar_url" text,
    "role" text default 'user'::text,
    "trust_score" double precision default 0,
    "created_at" timestamp without time zone default now()
      );


alter table "public"."profiles" enable row level security;


  create table "public"."report_status_history" (
    "id" uuid not null default extensions.uuid_generate_v4(),
    "report_id" uuid,
    "status" text,
    "updated_by" uuid,
    "note" text,
    "created_at" timestamp without time zone default now()
      );


alter table "public"."report_status_history" enable row level security;


  create table "public"."reports" (
    "id" uuid not null default extensions.uuid_generate_v4(),
    "user_id" uuid,
    "place_id" uuid,
    "title" text,
    "description" text,
    "category" text,
    "cleanliness_level" integer,
    "status" text default 'pending'::text,
    "created_at" timestamp without time zone default now()
      );


alter table "public"."reports" enable row level security;


  create table "public"."resolutions" (
    "id" uuid not null default extensions.uuid_generate_v4(),
    "report_id" uuid,
    "resolved_by" uuid,
    "resolution_note" text,
    "resolved_at" timestamp without time zone default now()
      );


alter table "public"."resolutions" enable row level security;

CREATE UNIQUE INDEX agent_decisions_pkey ON public.agent_decisions USING btree (id);

CREATE UNIQUE INDEX ai_analysis_pkey ON public.ai_analysis USING btree (id);

CREATE UNIQUE INDEX ai_jobs_pkey ON public.ai_jobs USING btree (id);

CREATE INDEX idx_ai_analysis_json ON public.ai_analysis USING gin (detected_objects);

CREATE INDEX idx_ai_analysis_report ON public.ai_analysis USING btree (report_id);

CREATE INDEX idx_media_report ON public.media USING btree (report_id);

CREATE INDEX idx_notifications_user ON public.notifications USING btree (user_id);

CREATE INDEX idx_places_geo ON public.places USING btree (latitude, longitude);

CREATE INDEX idx_reports_place ON public.reports USING btree (place_id);

CREATE INDEX idx_reports_status ON public.reports USING btree (status);

CREATE INDEX idx_reports_user ON public.reports USING btree (user_id);

CREATE INDEX idx_status_history_report ON public.report_status_history USING btree (report_id);

CREATE UNIQUE INDEX media_pkey ON public.media USING btree (id);

CREATE UNIQUE INDEX notifications_pkey ON public.notifications USING btree (id);

CREATE UNIQUE INDEX places_pkey ON public.places USING btree (id);

CREATE UNIQUE INDEX profiles_pkey ON public.profiles USING btree (id);

CREATE UNIQUE INDEX report_status_history_pkey ON public.report_status_history USING btree (id);

CREATE UNIQUE INDEX reports_pkey ON public.reports USING btree (id);

CREATE UNIQUE INDEX resolutions_pkey ON public.resolutions USING btree (id);

alter table "public"."agent_decisions" add constraint "agent_decisions_pkey" PRIMARY KEY using index "agent_decisions_pkey";

alter table "public"."ai_analysis" add constraint "ai_analysis_pkey" PRIMARY KEY using index "ai_analysis_pkey";

alter table "public"."ai_jobs" add constraint "ai_jobs_pkey" PRIMARY KEY using index "ai_jobs_pkey";

alter table "public"."media" add constraint "media_pkey" PRIMARY KEY using index "media_pkey";

alter table "public"."notifications" add constraint "notifications_pkey" PRIMARY KEY using index "notifications_pkey";

alter table "public"."places" add constraint "places_pkey" PRIMARY KEY using index "places_pkey";

alter table "public"."profiles" add constraint "profiles_pkey" PRIMARY KEY using index "profiles_pkey";

alter table "public"."report_status_history" add constraint "report_status_history_pkey" PRIMARY KEY using index "report_status_history_pkey";

alter table "public"."reports" add constraint "reports_pkey" PRIMARY KEY using index "reports_pkey";

alter table "public"."resolutions" add constraint "resolutions_pkey" PRIMARY KEY using index "resolutions_pkey";

alter table "public"."agent_decisions" add constraint "agent_decisions_report_id_fkey" FOREIGN KEY (report_id) REFERENCES public.reports(id) ON DELETE CASCADE not valid;

alter table "public"."agent_decisions" validate constraint "agent_decisions_report_id_fkey";

alter table "public"."ai_analysis" add constraint "ai_analysis_report_id_fkey" FOREIGN KEY (report_id) REFERENCES public.reports(id) ON DELETE CASCADE not valid;

alter table "public"."ai_analysis" validate constraint "ai_analysis_report_id_fkey";

alter table "public"."ai_jobs" add constraint "ai_jobs_report_id_fkey" FOREIGN KEY (report_id) REFERENCES public.reports(id) ON DELETE CASCADE not valid;

alter table "public"."ai_jobs" validate constraint "ai_jobs_report_id_fkey";

alter table "public"."ai_jobs" add constraint "ai_jobs_status_check" CHECK ((status = ANY (ARRAY['queued'::text, 'processing'::text, 'done'::text, 'failed'::text]))) not valid;

alter table "public"."ai_jobs" validate constraint "ai_jobs_status_check";

alter table "public"."media" add constraint "media_media_type_check" CHECK ((media_type = ANY (ARRAY['image'::text, 'video'::text]))) not valid;

alter table "public"."media" validate constraint "media_media_type_check";

alter table "public"."media" add constraint "media_report_id_fkey" FOREIGN KEY (report_id) REFERENCES public.reports(id) ON DELETE CASCADE not valid;

alter table "public"."media" validate constraint "media_report_id_fkey";

alter table "public"."media" add constraint "media_uploader_id_fkey" FOREIGN KEY (uploader_id) REFERENCES public.profiles(id) ON DELETE SET NULL not valid;

alter table "public"."media" validate constraint "media_uploader_id_fkey";

alter table "public"."notifications" add constraint "notifications_user_id_fkey" FOREIGN KEY (user_id) REFERENCES public.profiles(id) ON DELETE CASCADE not valid;

alter table "public"."notifications" validate constraint "notifications_user_id_fkey";

alter table "public"."profiles" add constraint "profiles_id_fkey" FOREIGN KEY (id) REFERENCES auth.users(id) ON DELETE CASCADE not valid;

alter table "public"."profiles" validate constraint "profiles_id_fkey";

alter table "public"."profiles" add constraint "profiles_role_check" CHECK ((role = ANY (ARRAY['user'::text, 'moderator'::text, 'government'::text]))) not valid;

alter table "public"."profiles" validate constraint "profiles_role_check";

alter table "public"."report_status_history" add constraint "report_status_history_report_id_fkey" FOREIGN KEY (report_id) REFERENCES public.reports(id) ON DELETE CASCADE not valid;

alter table "public"."report_status_history" validate constraint "report_status_history_report_id_fkey";

alter table "public"."reports" add constraint "reports_cleanliness_level_check" CHECK (((cleanliness_level >= 1) AND (cleanliness_level <= 10))) not valid;

alter table "public"."reports" validate constraint "reports_cleanliness_level_check";

alter table "public"."reports" add constraint "reports_place_id_fkey" FOREIGN KEY (place_id) REFERENCES public.places(id) ON DELETE CASCADE not valid;

alter table "public"."reports" validate constraint "reports_place_id_fkey";

alter table "public"."reports" add constraint "reports_status_check" CHECK ((status = ANY (ARRAY['pending'::text, 'ai_processed'::text, 'verified'::text, 'sent'::text, 'resolved'::text, 'rejected'::text]))) not valid;

alter table "public"."reports" validate constraint "reports_status_check";

alter table "public"."reports" add constraint "reports_user_id_fkey" FOREIGN KEY (user_id) REFERENCES public.profiles(id) ON DELETE SET NULL not valid;

alter table "public"."reports" validate constraint "reports_user_id_fkey";

alter table "public"."resolutions" add constraint "resolutions_report_id_fkey" FOREIGN KEY (report_id) REFERENCES public.reports(id) ON DELETE CASCADE not valid;

alter table "public"."resolutions" validate constraint "resolutions_report_id_fkey";

set check_function_bodies = off;

CREATE OR REPLACE FUNCTION public.handle_new_user()
 RETURNS trigger
 LANGUAGE plpgsql
AS $function$
begin
  insert into profiles (id)
  values (new.id);
  return new;
end;
$function$
;

create or replace view "public"."place_stats" as  SELECT p.id AS place_id,
    count(r.id) AS report_count,
    avg(r.cleanliness_level) AS avg_cleanliness
   FROM (public.places p
     LEFT JOIN public.reports r ON ((p.id = r.place_id)))
  GROUP BY p.id;


CREATE OR REPLACE FUNCTION public.rls_auto_enable()
 RETURNS event_trigger
 LANGUAGE plpgsql
 SECURITY DEFINER
 SET search_path TO 'pg_catalog'
AS $function$
DECLARE
  cmd record;
BEGIN
  FOR cmd IN
    SELECT *
    FROM pg_event_trigger_ddl_commands()
    WHERE command_tag IN ('CREATE TABLE', 'CREATE TABLE AS', 'SELECT INTO')
      AND object_type IN ('table','partitioned table')
  LOOP
     IF cmd.schema_name IS NOT NULL AND cmd.schema_name IN ('public') AND cmd.schema_name NOT IN ('pg_catalog','information_schema') AND cmd.schema_name NOT LIKE 'pg_toast%' AND cmd.schema_name NOT LIKE 'pg_temp%' THEN
      BEGIN
        EXECUTE format('alter table if exists %s enable row level security', cmd.object_identity);
        RAISE LOG 'rls_auto_enable: enabled RLS on %', cmd.object_identity;
      EXCEPTION
        WHEN OTHERS THEN
          RAISE LOG 'rls_auto_enable: failed to enable RLS on %', cmd.object_identity;
      END;
     ELSE
        RAISE LOG 'rls_auto_enable: skip % (either system schema or not in enforced list: %.)', cmd.object_identity, cmd.schema_name;
     END IF;
  END LOOP;
END;
$function$
;

grant delete on table "public"."agent_decisions" to "anon";

grant insert on table "public"."agent_decisions" to "anon";

grant references on table "public"."agent_decisions" to "anon";

grant select on table "public"."agent_decisions" to "anon";

grant trigger on table "public"."agent_decisions" to "anon";

grant truncate on table "public"."agent_decisions" to "anon";

grant update on table "public"."agent_decisions" to "anon";

grant delete on table "public"."agent_decisions" to "authenticated";

grant insert on table "public"."agent_decisions" to "authenticated";

grant references on table "public"."agent_decisions" to "authenticated";

grant select on table "public"."agent_decisions" to "authenticated";

grant trigger on table "public"."agent_decisions" to "authenticated";

grant truncate on table "public"."agent_decisions" to "authenticated";

grant update on table "public"."agent_decisions" to "authenticated";

grant delete on table "public"."agent_decisions" to "service_role";

grant insert on table "public"."agent_decisions" to "service_role";

grant references on table "public"."agent_decisions" to "service_role";

grant select on table "public"."agent_decisions" to "service_role";

grant trigger on table "public"."agent_decisions" to "service_role";

grant truncate on table "public"."agent_decisions" to "service_role";

grant update on table "public"."agent_decisions" to "service_role";

grant delete on table "public"."ai_analysis" to "anon";

grant insert on table "public"."ai_analysis" to "anon";

grant references on table "public"."ai_analysis" to "anon";

grant select on table "public"."ai_analysis" to "anon";

grant trigger on table "public"."ai_analysis" to "anon";

grant truncate on table "public"."ai_analysis" to "anon";

grant update on table "public"."ai_analysis" to "anon";

grant delete on table "public"."ai_analysis" to "authenticated";

grant insert on table "public"."ai_analysis" to "authenticated";

grant references on table "public"."ai_analysis" to "authenticated";

grant select on table "public"."ai_analysis" to "authenticated";

grant trigger on table "public"."ai_analysis" to "authenticated";

grant truncate on table "public"."ai_analysis" to "authenticated";

grant update on table "public"."ai_analysis" to "authenticated";

grant delete on table "public"."ai_analysis" to "service_role";

grant insert on table "public"."ai_analysis" to "service_role";

grant references on table "public"."ai_analysis" to "service_role";

grant select on table "public"."ai_analysis" to "service_role";

grant trigger on table "public"."ai_analysis" to "service_role";

grant truncate on table "public"."ai_analysis" to "service_role";

grant update on table "public"."ai_analysis" to "service_role";

grant delete on table "public"."ai_jobs" to "anon";

grant insert on table "public"."ai_jobs" to "anon";

grant references on table "public"."ai_jobs" to "anon";

grant select on table "public"."ai_jobs" to "anon";

grant trigger on table "public"."ai_jobs" to "anon";

grant truncate on table "public"."ai_jobs" to "anon";

grant update on table "public"."ai_jobs" to "anon";

grant delete on table "public"."ai_jobs" to "authenticated";

grant insert on table "public"."ai_jobs" to "authenticated";

grant references on table "public"."ai_jobs" to "authenticated";

grant select on table "public"."ai_jobs" to "authenticated";

grant trigger on table "public"."ai_jobs" to "authenticated";

grant truncate on table "public"."ai_jobs" to "authenticated";

grant update on table "public"."ai_jobs" to "authenticated";

grant delete on table "public"."ai_jobs" to "service_role";

grant insert on table "public"."ai_jobs" to "service_role";

grant references on table "public"."ai_jobs" to "service_role";

grant select on table "public"."ai_jobs" to "service_role";

grant trigger on table "public"."ai_jobs" to "service_role";

grant truncate on table "public"."ai_jobs" to "service_role";

grant update on table "public"."ai_jobs" to "service_role";

grant delete on table "public"."media" to "anon";

grant insert on table "public"."media" to "anon";

grant references on table "public"."media" to "anon";

grant select on table "public"."media" to "anon";

grant trigger on table "public"."media" to "anon";

grant truncate on table "public"."media" to "anon";

grant update on table "public"."media" to "anon";

grant delete on table "public"."media" to "authenticated";

grant insert on table "public"."media" to "authenticated";

grant references on table "public"."media" to "authenticated";

grant select on table "public"."media" to "authenticated";

grant trigger on table "public"."media" to "authenticated";

grant truncate on table "public"."media" to "authenticated";

grant update on table "public"."media" to "authenticated";

grant delete on table "public"."media" to "service_role";

grant insert on table "public"."media" to "service_role";

grant references on table "public"."media" to "service_role";

grant select on table "public"."media" to "service_role";

grant trigger on table "public"."media" to "service_role";

grant truncate on table "public"."media" to "service_role";

grant update on table "public"."media" to "service_role";

grant delete on table "public"."notifications" to "anon";

grant insert on table "public"."notifications" to "anon";

grant references on table "public"."notifications" to "anon";

grant select on table "public"."notifications" to "anon";

grant trigger on table "public"."notifications" to "anon";

grant truncate on table "public"."notifications" to "anon";

grant update on table "public"."notifications" to "anon";

grant delete on table "public"."notifications" to "authenticated";

grant insert on table "public"."notifications" to "authenticated";

grant references on table "public"."notifications" to "authenticated";

grant select on table "public"."notifications" to "authenticated";

grant trigger on table "public"."notifications" to "authenticated";

grant truncate on table "public"."notifications" to "authenticated";

grant update on table "public"."notifications" to "authenticated";

grant delete on table "public"."notifications" to "service_role";

grant insert on table "public"."notifications" to "service_role";

grant references on table "public"."notifications" to "service_role";

grant select on table "public"."notifications" to "service_role";

grant trigger on table "public"."notifications" to "service_role";

grant truncate on table "public"."notifications" to "service_role";

grant update on table "public"."notifications" to "service_role";

grant delete on table "public"."places" to "anon";

grant insert on table "public"."places" to "anon";

grant references on table "public"."places" to "anon";

grant select on table "public"."places" to "anon";

grant trigger on table "public"."places" to "anon";

grant truncate on table "public"."places" to "anon";

grant update on table "public"."places" to "anon";

grant delete on table "public"."places" to "authenticated";

grant insert on table "public"."places" to "authenticated";

grant references on table "public"."places" to "authenticated";

grant select on table "public"."places" to "authenticated";

grant trigger on table "public"."places" to "authenticated";

grant truncate on table "public"."places" to "authenticated";

grant update on table "public"."places" to "authenticated";

grant delete on table "public"."places" to "service_role";

grant insert on table "public"."places" to "service_role";

grant references on table "public"."places" to "service_role";

grant select on table "public"."places" to "service_role";

grant trigger on table "public"."places" to "service_role";

grant truncate on table "public"."places" to "service_role";

grant update on table "public"."places" to "service_role";

grant delete on table "public"."profiles" to "anon";

grant insert on table "public"."profiles" to "anon";

grant references on table "public"."profiles" to "anon";

grant select on table "public"."profiles" to "anon";

grant trigger on table "public"."profiles" to "anon";

grant truncate on table "public"."profiles" to "anon";

grant update on table "public"."profiles" to "anon";

grant delete on table "public"."profiles" to "authenticated";

grant insert on table "public"."profiles" to "authenticated";

grant references on table "public"."profiles" to "authenticated";

grant select on table "public"."profiles" to "authenticated";

grant trigger on table "public"."profiles" to "authenticated";

grant truncate on table "public"."profiles" to "authenticated";

grant update on table "public"."profiles" to "authenticated";

grant delete on table "public"."profiles" to "service_role";

grant insert on table "public"."profiles" to "service_role";

grant references on table "public"."profiles" to "service_role";

grant select on table "public"."profiles" to "service_role";

grant trigger on table "public"."profiles" to "service_role";

grant truncate on table "public"."profiles" to "service_role";

grant update on table "public"."profiles" to "service_role";

grant delete on table "public"."report_status_history" to "anon";

grant insert on table "public"."report_status_history" to "anon";

grant references on table "public"."report_status_history" to "anon";

grant select on table "public"."report_status_history" to "anon";

grant trigger on table "public"."report_status_history" to "anon";

grant truncate on table "public"."report_status_history" to "anon";

grant update on table "public"."report_status_history" to "anon";

grant delete on table "public"."report_status_history" to "authenticated";

grant insert on table "public"."report_status_history" to "authenticated";

grant references on table "public"."report_status_history" to "authenticated";

grant select on table "public"."report_status_history" to "authenticated";

grant trigger on table "public"."report_status_history" to "authenticated";

grant truncate on table "public"."report_status_history" to "authenticated";

grant update on table "public"."report_status_history" to "authenticated";

grant delete on table "public"."report_status_history" to "service_role";

grant insert on table "public"."report_status_history" to "service_role";

grant references on table "public"."report_status_history" to "service_role";

grant select on table "public"."report_status_history" to "service_role";

grant trigger on table "public"."report_status_history" to "service_role";

grant truncate on table "public"."report_status_history" to "service_role";

grant update on table "public"."report_status_history" to "service_role";

grant delete on table "public"."reports" to "anon";

grant insert on table "public"."reports" to "anon";

grant references on table "public"."reports" to "anon";

grant select on table "public"."reports" to "anon";

grant trigger on table "public"."reports" to "anon";

grant truncate on table "public"."reports" to "anon";

grant update on table "public"."reports" to "anon";

grant delete on table "public"."reports" to "authenticated";

grant insert on table "public"."reports" to "authenticated";

grant references on table "public"."reports" to "authenticated";

grant select on table "public"."reports" to "authenticated";

grant trigger on table "public"."reports" to "authenticated";

grant truncate on table "public"."reports" to "authenticated";

grant update on table "public"."reports" to "authenticated";

grant delete on table "public"."reports" to "service_role";

grant insert on table "public"."reports" to "service_role";

grant references on table "public"."reports" to "service_role";

grant select on table "public"."reports" to "service_role";

grant trigger on table "public"."reports" to "service_role";

grant truncate on table "public"."reports" to "service_role";

grant update on table "public"."reports" to "service_role";

grant delete on table "public"."resolutions" to "anon";

grant insert on table "public"."resolutions" to "anon";

grant references on table "public"."resolutions" to "anon";

grant select on table "public"."resolutions" to "anon";

grant trigger on table "public"."resolutions" to "anon";

grant truncate on table "public"."resolutions" to "anon";

grant update on table "public"."resolutions" to "anon";

grant delete on table "public"."resolutions" to "authenticated";

grant insert on table "public"."resolutions" to "authenticated";

grant references on table "public"."resolutions" to "authenticated";

grant select on table "public"."resolutions" to "authenticated";

grant trigger on table "public"."resolutions" to "authenticated";

grant truncate on table "public"."resolutions" to "authenticated";

grant update on table "public"."resolutions" to "authenticated";

grant delete on table "public"."resolutions" to "service_role";

grant insert on table "public"."resolutions" to "service_role";

grant references on table "public"."resolutions" to "service_role";

grant select on table "public"."resolutions" to "service_role";

grant trigger on table "public"."resolutions" to "service_role";

grant truncate on table "public"."resolutions" to "service_role";

grant update on table "public"."resolutions" to "service_role";


  create policy "Users manage own media"
  on "public"."media"
  as permissive
  for all
  to public
using ((auth.uid() = uploader_id));



  create policy "Users can insert reports"
  on "public"."reports"
  as permissive
  for insert
  to public
with check ((auth.uid() = user_id));



  create policy "Users can view own reports"
  on "public"."reports"
  as permissive
  for select
  to public
using ((auth.uid() = user_id));


CREATE TRIGGER on_auth_user_created AFTER INSERT ON auth.users FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();


