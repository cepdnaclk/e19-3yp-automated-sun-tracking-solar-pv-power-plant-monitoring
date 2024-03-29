#include <pgmspace.h>

#define SECRET
#define THINGNAME "HelioEyeMount1" // change this

const char AWS_IOT_ENDPOINT[] = "a1oumfnyy7f8d9-ats.iot.us-east-1.amazonaws.com"; // change this

// Amazon Root CA 1
static const char AWS_CERT_CA[] PROGMEM = R"EOF(
-----BEGIN CERTIFICATE-----
MIIDQTCCAimgAwIBAgITBmyfz5m/jAo54vB4ikPmljZbyjANBgkqhkiG9w0BAQsF
ADA5MQswCQYDVQQGEwJVUzEPMA0GA1UEChMGQW1hem9uMRkwFwYDVQQDExBBbWF6
b24gUm9vdCBDQSAxMB4XDTE1MDUyNjAwMDAwMFoXDTM4MDExNzAwMDAwMFowOTEL
MAkGA1UEBhMCVVMxDzANBgNVBAoTBkFtYXpvbjEZMBcGA1UEAxMQQW1hem9uIFJv
b3QgQ0EgMTCCASIwDQYJKoZIhvcNAQEBBQADggEPADCCAQoCggEBALJ4gHHKeNXj
ca9HgFB0fW7Y14h29Jlo91ghYPl0hAEvrAIthtOgQ3pOsqTQNroBvo3bSMgHFzZM
9O6II8c+6zf1tRn4SWiw3te5djgdYZ6k/oI2peVKVuRF4fn9tBb6dNqcmzU5L/qw
IFAGbHrQgLKm+a/sRxmPUDgH3KKHOVj4utWp+UhnMJbulHheb4mjUcAwhmahRWa6
VOujw5H5SNz/0egwLX0tdHA114gk957EWW67c4cX8jJGKLhD+rcdqsq08p8kDi1L
93FcXmn/6pUCyziKrlA4b9v7LWIbxcceVOF34GfID5yHI9Y/QCB/IIDEgEw+OyQm
jgSubJrIqg0CAwEAAaNCMEAwDwYDVR0TAQH/BAUwAwEB/zAOBgNVHQ8BAf8EBAMC
AYYwHQYDVR0OBBYEFIQYzIU07LwMlJQuCFmcx7IQTgoIMA0GCSqGSIb3DQEBCwUA
A4IBAQCY8jdaQZChGsV2USggNiMOruYou6r4lK5IpDB/G/wkjUu0yKGX9rbxenDI
U5PMCCjjmCXPI6T53iHTfIUJrU6adTrCC2qJeHZERxhlbI1Bjjt/msv0tadQ1wUs
N+gDS63pYaACbvXy8MWy7Vu33PqUXHeeE6V/Uq2V8viTO96LXFvKWlJbYK8U90vv
o/ufQJVtMVT8QtPHRh8jrdkPSHCa2XV4cdFyQzR1bldZwgJcJmApzyMZFo6IQ6XU
5MsI+yMRQ+hDKXJioaldXgjUkK642M4UwtBV8ob2xJNDd2ZhwLnoQdeXeGADbkpy
rqXRfboQnoZsG4q5WTP468SQvvG5
-----END CERTIFICATE-----
)EOF";

// Device Certificate                                               //change this
static const char AWS_CERT_CRT[] PROGMEM = R"KEY(
-----BEGIN CERTIFICATE-----
MIIDWjCCAkKgAwIBAgIVALosUAQqVvokubJdauqJeEMki2+7MA0GCSqGSIb3DQEB
CwUAME0xSzBJBgNVBAsMQkFtYXpvbiBXZWIgU2VydmljZXMgTz1BbWF6b24uY29t
IEluYy4gTD1TZWF0dGxlIFNUPVdhc2hpbmd0b24gQz1VUzAeFw0yNDAxMjgwMzEx
NTBaFw00OTEyMzEyMzU5NTlaMB4xHDAaBgNVBAMME0FXUyBJb1QgQ2VydGlmaWNh
dGUwggEiMA0GCSqGSIb3DQEBAQUAA4IBDwAwggEKAoIBAQDHZnXQjNN/pHm2GAlo
itl+MK0aD2RwAAhZ2q0vNLiyW86GtgbmineXyxgTKWaeRrx7HmGNX/AXLEnCM4TA
zTo3iw/kEEhIp6+bwgi4Rxecu50wrwK0yb+bh51fBHwyBeGlHd9Xe5pMI9GYsIJU
fEBF00QVniw7kQ6Htqyq/hLHAFjLbdquQPO3XfTYzqfNYYEHgs+wS/d+bxrOv3Y1
oJnXEczmNxasuah/xa4SlmM6v53V/j7mxUk9n1yNM+qETCi3nOaNUiFidB/UH6s4
5xWSuXQafR+uGPyKZljS/lZ8iTodMthtPkjCfIWh4V5yMdc5c61xJ0sda8B00xk0
juuZAgMBAAGjYDBeMB8GA1UdIwQYMBaAFHkSfm53SXu95wJ9/KUMYCGsmL0XMB0G
A1UdDgQWBBQv87uTobrNh/irqvGZ5vDTNTL2YjAMBgNVHRMBAf8EAjAAMA4GA1Ud
DwEB/wQEAwIHgDANBgkqhkiG9w0BAQsFAAOCAQEAP5uEvm+Uqi5XCdduThsfvUfR
r8fWF0PFpTZqr9IynuWHHkhdUykEerdcrTM7ezLjkB2fwL2vt1wwpJFZa8Cq0O+g
zR+T3oeCnB2Ww7EV8SDcE07x9vF2NQfJC44BThyNUmy//PiAQ5XP/XtX7uw9L+HP
zdtkBgVxj221DLK/1kP/9pifLTxVQWFhwTld8pEcWvK7gdJoVcXPPlmS7GXLvwt3
155NEJTxDzkQi5gemsQ/Rbo0ujth6N6zM3L9bOMHn4UcxXzhpG/aTpcOphqtd8tq
uwaKa4Vfh+ML2fSQte8hLBllvci9CrKOOvAhYeqvu+YfQn9wXjEXNYD9JjXnRg==
-----END CERTIFICATE-----

)KEY";

// Device Private Key                                               //change this
static const char AWS_CERT_PRIVATE[] PROGMEM = R"KEY(
-----BEGIN RSA PRIVATE KEY-----
MIIEogIBAAKCAQEAx2Z10IzTf6R5thgJaIrZfjCtGg9kcAAIWdqtLzS4slvOhrYG
5op3l8sYEylmnka8ex5hjV/wFyxJwjOEwM06N4sP5BBISKevm8IIuEcXnLudMK8C
tMm/m4edXwR8MgXhpR3fV3uaTCPRmLCCVHxARdNEFZ4sO5EOh7asqv4SxwBYy23a
rkDzt1302M6nzWGBB4LPsEv3fm8azr92NaCZ1xHM5jcWrLmof8WuEpZjOr+d1f4+
5sVJPZ9cjTPqhEwot5zmjVIhYnQf1B+rOOcVkrl0Gn0frhj8imZY0v5WfIk6HTLY
bT5IwnyFoeFecjHXOXOtcSdLHWvAdNMZNI7rmQIDAQABAoIBAH7OBMxMUk/Q++m2
HX2TFz7tm5eABGJJUwY5T3s+rtoWEh+O8JJ5qhYo/LVq1ax/1WsCZg0u3pMOAhXz
B1BI8uXRlJh3VlCF+uI1oa/23eg5U3xbP4BS8Hvq4UREqOpy3Q1REvAiVXxoJulQ
DoHFxmXhNWH+BakX1UKvA9111+Eekr6h0yaQreGyZaPrZwaSogGeI1qsfTn33PUz
XZn+aZ+TMlE/Yi6trATxp2sYj6pK7ZNtf/zZm5akXRuqsj+Yf06fFSzs/cYdf2WX
UHih7SrPz9iY0DCEt+1rxnCcJxWuSB1Yf1Doz9epV1DpiLabluCLkQXnjs2s8wBj
gYvUwSUCgYEA62Zj4EYZaC0e2MKpDw4YpqTe5a7pfaubjmV1Sg7WIA2R9wYIbWwc
6TgRUf3QNsLUW6uO6joP3x++Fr7KvDvrAl8wdGxtI99JrP80u98F43B2jS69GjXA
GS2g2K5IobLxWmiD6FvcFw+kjRbonPjiCXo/19PYcgsFoJ6gk/D4RY8CgYEA2NmT
oeQwx9ah9WF9fu/JpRwt1mGgPsd8nuAL4G5WoYdtA/wL36fq2DCw0DGk1XR7UAiF
lRhEEiLxEQeqhNKBxehlDTBqXq+Jku6HCIkbUsU6PkVCpgneg9VvpeSHkNe8tJTt
23OFaRUY+hIekKPrlH+IcYz3J1HHTOIww6OIOFcCgYB+W7DjE13SAN5dBmjPTwbG
dRu8+N4W+kX+8tE51qrz+7TNf6yIaA9A1Tre4zqgGob5Sibl7hLU92oHNZUH47Xr
yQLui8EuD06yES/SZQ35H0ZT1LHnXtDl8wszJKKSQcayfAXKdXy32ErA/XoRwLs8
0SVyCiJWXTpBFMUnhKMQWwKBgA5tKy0yCSzCUrQIcFjpivi5DzOb+xUyIFBRh3i+
3nSQlegV9JREj5MiaiDvrI+m2C1S49AvdRffyzne0LFVb9zCwTZHakwyUWy9Aa7H
sFGpXV6XLP/u2CbdJDhdI8e3Eo7Q+aIH5XBAPxEj83Sb8yhF88XaIvcysZej1Kqv
TnixAoGAbrgKZubjeJzMtQkYFIGKTzUf6uVZGbyZtA2jKrAMzopvC6W/Ed92ZizS
Pftjmd31E3zlCzGizAEbFPoIu0OtRM+H3rNswMmVljajbB3Fx4I4VrvnsBE9yL6i
uOAp/M3JSPViBIrjM+rLuEOEkvchmZldZpuSR8TWGAoZU9PkRBs=
-----END RSA PRIVATE KEY-----

)KEY";