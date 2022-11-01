--
-- PostgreSQL database dump
--

-- Dumped from database version 14.4
-- Dumped by pg_dump version 14.4

-- Started on 2022-11-01 12:12:25

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- TOC entry 213 (class 1259 OID 16586)
-- Name: exercise_entry; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.exercise_entry (
    workout_id bigint NOT NULL,
    exercise_id bigint NOT NULL,
    id bigint NOT NULL,
    repetitions bigint NOT NULL,
    weight double precision NOT NULL
);


ALTER TABLE public.exercise_entry OWNER TO postgres;

--
-- TOC entry 214 (class 1259 OID 16629)
-- Name: exercise_entry_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

ALTER TABLE public.exercise_entry ALTER COLUMN id ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public.exercise_entry_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);


--
-- TOC entry 209 (class 1259 OID 16538)
-- Name: exercises; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.exercises (
    id bigint NOT NULL,
    name character varying NOT NULL
);


ALTER TABLE public.exercises OWNER TO postgres;

--
-- TOC entry 211 (class 1259 OID 16547)
-- Name: exercises_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

ALTER TABLE public.exercises ALTER COLUMN id ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public.exercises_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);


--
-- TOC entry 210 (class 1259 OID 16541)
-- Name: workouts; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.workouts (
    id bigint NOT NULL,
    date date NOT NULL,
    description character varying
);


ALTER TABLE public.workouts OWNER TO postgres;

--
-- TOC entry 212 (class 1259 OID 16555)
-- Name: workouts_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

ALTER TABLE public.workouts ALTER COLUMN id ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public.workouts_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);


--
-- TOC entry 3329 (class 0 OID 16586)
-- Dependencies: 213
-- Data for Name: exercise_entry; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.exercise_entry (workout_id, exercise_id, id, repetitions, weight) FROM stdin;
90	47	148	1	90
90	47	149	1	90
90	49	150	2	120
90	49	151	2	120
96	48	152	5	45
96	48	153	5	45
96	49	154	2	90
96	49	155	2	90
98	47	156	5	50
98	47	157	5	52.5
98	47	158	5	57.5
98	48	159	5	60
98	48	160	4	60
98	48	161	3	60
98	49	162	5	100
98	49	163	5	100
98	49	164	2	100
\.


--
-- TOC entry 3325 (class 0 OID 16538)
-- Dependencies: 209
-- Data for Name: exercises; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.exercises (id, name) FROM stdin;
47	Squat
48	Bench press
49	Deadlift
\.


--
-- TOC entry 3326 (class 0 OID 16541)
-- Dependencies: 210
-- Data for Name: workouts; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.workouts (id, date, description) FROM stdin;
90	2022-10-31	One rep max training
96	2022-10-25	No breakfast:(
98	2022-10-19	Training with a new plan
\.


--
-- TOC entry 3336 (class 0 OID 0)
-- Dependencies: 214
-- Name: exercise_entry_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.exercise_entry_id_seq', 164, true);


--
-- TOC entry 3337 (class 0 OID 0)
-- Dependencies: 211
-- Name: exercises_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.exercises_id_seq', 49, true);


--
-- TOC entry 3338 (class 0 OID 0)
-- Dependencies: 212
-- Name: workouts_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.workouts_id_seq', 100, true);


--
-- TOC entry 3181 (class 2606 OID 16628)
-- Name: exercise_entry exercise_entry_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.exercise_entry
    ADD CONSTRAINT exercise_entry_pkey PRIMARY KEY (id);


--
-- TOC entry 3175 (class 2606 OID 16554)
-- Name: exercises exercises_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.exercises
    ADD CONSTRAINT exercises_pkey PRIMARY KEY (id);


--
-- TOC entry 3177 (class 2606 OID 16585)
-- Name: exercises unique_name; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.exercises
    ADD CONSTRAINT unique_name UNIQUE (name);


--
-- TOC entry 3179 (class 2606 OID 16562)
-- Name: workouts workouts_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.workouts
    ADD CONSTRAINT workouts_pkey PRIMARY KEY (id);


--
-- TOC entry 3182 (class 1259 OID 16640)
-- Name: fki_exercise_fk; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX fki_exercise_fk ON public.exercise_entry USING btree (exercise_id);


--
-- TOC entry 3183 (class 1259 OID 16646)
-- Name: fki_workout_fk; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX fki_workout_fk ON public.exercise_entry USING btree (workout_id);


--
-- TOC entry 3184 (class 2606 OID 16635)
-- Name: exercise_entry exercise_fk; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.exercise_entry
    ADD CONSTRAINT exercise_fk FOREIGN KEY (exercise_id) REFERENCES public.exercises(id) NOT VALID;


--
-- TOC entry 3185 (class 2606 OID 16641)
-- Name: exercise_entry workout_fk; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.exercise_entry
    ADD CONSTRAINT workout_fk FOREIGN KEY (workout_id) REFERENCES public.workouts(id) NOT VALID;


-- Completed on 2022-11-01 12:12:25

--
-- PostgreSQL database dump complete
--

