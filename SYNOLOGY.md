# RipperSync na Synology

## Trwaly katalog danych

W Container Manager podmontuj katalog Synology jako wolumen kontenera:

```text
/volume1/docker/ripperdoc/data  ->  /app/data
```

Nastepnie ustaw:

```env
TESTER_DATA_DIR=/app/data
```

W tym katalogu system zapisuje liste testerow i zaszyfrowane tokeny urzadzen.
Katalog nie moze byc publicznie udostepniany przez serwer WWW.

## Wymagane zmienne

```env
PUBLIC_APP_URL=https://ripperdoc.ai
TESTER_ADMIN_EMAIL=tomaszmroczynski@complet-ai.no
TESTER_AUTH_SECRET=dlugi-losowy-sekret
DEVICE_TOKEN_SECRET=drugi-dlugi-losowy-sekret

SMTP_HOST=mail-eu.smtp2go.com
SMTP_PORT=2525
SMTP_USER=complet-ai.no
SMTP_PASSWORD=haslo-uzytkownika-smtp2go
SMTP_FROM=RipperSync <tomaszmroczynski@complet-ai.no>
```

Sekrety powinny miec co najmniej 32 losowe znaki. Zmiana
`DEVICE_TOKEN_SECRET` uniemozliwi odczyt zapisanych tokenow integracji.

## Oura

```env
OURA_CLIENT_ID=...
OURA_CLIENT_SECRET=...
```

Adres callback do wpisania w aplikacji Oura:

```text
https://ripperdoc.ai/api/integrations/oura/callback
```

## Withings

```env
WITHINGS_CLIENT_ID=...
WITHINGS_CLIENT_SECRET=...
```

Adres callback do wpisania w Withings Partner Hub:

```text
https://ripperdoc.ai/api/integrations/withings/callback
```

## Aplikacja Android

Podaj bezposredni adres aplikacji w Google Play albo podpisanego pliku APK:

```env
ANDROID_APP_URL=https://...
```

Konfigurator automatycznie wygeneruje z tego adresu kod QR.

