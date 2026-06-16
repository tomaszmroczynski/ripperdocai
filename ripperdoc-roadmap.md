# Ripperdoc — plan serwisu (MVP)

Idea w jednym zdaniu: technologia jest augmentacją, człowiek jest bohaterem.
Tagline: **Human First. Intelligence Amplified.**
Domena: ripperdoc.ai (zarejestrowana, strona do zbudowania).

Decyzje zamknięte na starcie:

- Model: usługi + produkt (konsola Atlas) na jednej stronie, bez rozjazdu.
- Odbiorca: szeroki/mieszany — buduje rozpoznawalność i obsługuje zarówno klienta B2B, jak i wczesnego użytkownika.
- Języki: norweski, angielski, polski — wszystkie trzy od pierwszego dnia.
- Horyzont: szybki MVP, potem iteracje.

## Powierzchnia MVP

Jedna kinowa strona, narracja prowadzona scrollem, bez bocznej nawigacji. Jedna oś, dwie historie: usługi = "co robimy dziś", Atlas = "dokąd to prowadzi".

Sekcje:

1. Hero — neural field (canvas), lockup, tagline, jedno zdanie o tym, co robicie.
2. Manifest — origin story (ripperdoc z Cyberpunka) przełożona na język marki: augmentation, not automation.
3. Co robimy — usługi: augmentacja wiedzy, decyzji, procesów. Thin-line ikony (Lucide, ember), nigdy roboty.
4. Atlas — zapowiedź produktu + zapis na early access (waitlista).
5. Dlaczego my / dowód — konkretne liczby albo krótki case (do uzupełnienia).
6. Kontakt / CTA — rozmowa + waitlista.

## Stack

Decyzja: **Next.js (App Router).** Jeden stack na marketing teraz i produkt/konsolę (Atlas/QuestSync) później; natywny na Vercelu.

- i18n: next-intl, trasy per język /no /en /pl (osobne URL-e, lepsze SEO).
- Style: design system Ripperdoc (tokeny CSS) jako global styles; neural-field.js jako klient; bez Tailwinda.
- bio-scan-3d.html: statyczny plik w /public, linkowany z sekcji QuestSync (z ?lang).
- Trade-off: cięższy niż statyk dla samego landingu, ale spójny pod przyszły produkt.

Hosting: Cloudflare Pages lub Vercel — statyk, globalny CDN, routing 3 języków, tani/darmowy start.

Analityka: prywatna (Plausible lub Umami) zamiast Google Analytics — spójne z human-first ethosem, bez cookie-bannera.

## i18n / SEO

- Routing per język: /no, /en, /pl. Fallback do ustalenia (sugestia: EN jako globalny fallback).
- hreflang dla trzech wersji, sensowne meta per język.
- OG image na bazie neural-field (statyczny render).
- Każda sekcja wymaga treści w NO/EN/PL — patrz checklist niżej.

## Etapowanie

- Faza 0 (dni): jedna strona, design system, neural field, deploy, zbieranie kontaktu + waitlisty. i18n w strukturze od początku.
- Faza 1: komplet treści NO/EN/PL na wszystkich sekcjach.
- Faza 2: głębsze podstrony — oferta, case studies.
- Faza 3: konsola Atlas jako osobna apka na wspólnych tokenach.

## Checklist treści (×3 języki: NO / EN / PL)

- [ ] Hero: jedno zdanie wartości + tagline
- [ ] Manifest: 1–2 akapity (origin story → augmentation, not automation)
- [ ] Usługi: 3–4 obszary augmentacji + krótkie opisy
- [ ] Atlas: czym jest, dla kogo, co daje + CTA waitlista
- [ ] Dowód: liczby/case (konkretne, nie vanity metrics)
- [ ] Kontakt: forma + e-mail
- [ ] Stopka: prawne, język-switcher

## Brand non-negotiables (pilnujemy na każdej powierzchni)

- Tła głębokie, prawie czarne (--ink-1000), jedno ciepłe światło ember/gold (--ember-500; --spark tylko dla jednego punktu fokusu).
- Typografia: Geist (treści), Geist Mono (dane, labelki).
- Sentence case w nagłówkach; UPPERCASE tylko dla lockupu i eyebrow-labeli; bez emoji.
- Sygnaturowy motyw: generative neural field. Nigdy stockowe AI, roboty, neonowy cyberpunk-kicz, glow-circuity, candy colors.
- Głos: spokojny, ekspercki, deklaratywny. Człowiek jest podmiotem zdania, technologia dopełnieniem.
- Uwaga z origin story: wątek militarny/fizyczny ("siła, refleks, zdolności bojowe") zostaje w narracji źródłowej, ale w copy marki przekładamy go na augmentację wiedzy i decyzji.

## Otwarte pytania do uzupełnienia

- Fallback językowy (EN?) i kolejność przełącznika.
- Dowód: czy są realne liczby/case na start, czy Atlas jest jedynym dowodem.
- Zakres usług: jakie konkretnie obszary augmentacji oferujecie.
- Forma kontaktu: prosty mailto, formularz, czy zewnętrzny tool.
