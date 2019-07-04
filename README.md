# Aktivnosti

Sva Komunikacija između front i back end-a ide preko HTTP-a

Base URL za API je `localhost:4567/api/`

## *Rute*

## `GET /shutdown`

Gasi server i prekida vezu sa database-om

## `GET /aktivnosti`
Vraća popis aktivnosti iz database-a u JSON obliku u tijelu odgovora

## `DELETE /aktivnosti/{ID aktivnosti}`
Briše određenu aktivnost iz database-a.

**Vraća status code 400 ako id argument u URL-u nije broj**

**Vraća status code 404 ako ako tražena aktivnost ne postoji**

## `PUT /aktivnosti/{ID aktivnosti}`
Uređuje aktivnost. Koristi vrijednosti iz header-a request-a:
`naziv`, `kategorija`, `podkategorija`

**Vraća status code 400 ako id argument u URL-u nije broj ili ako nema parametara**

**Vraća status code 404 ako ako tražena aktivnost ne postoji**

**Vraća status code 422 ako ako nova polja ne prolaze validaciju**


## `POST /aktivnosti`
Stvara novu aktivnost u database-u. Koristi vrijednosti iz header-a request-a: 
`naziv`, `kategorija`, `podkategorija`

**Vraća status code 422 ako ako nova polja ne prolaze validaciju**