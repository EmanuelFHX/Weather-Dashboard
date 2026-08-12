<div align="center">

# 🌦️ Weather Dashboard

### Dashboard meteorológico moderno para consulta de clima em tempo real

Consulte o clima de cidades ao redor do mundo, acompanhe previsões, salve favoritos e visualize informações meteorológicas em uma interface dinâmica e responsiva.

<br>

![HTML](https://img.shields.io/badge/HTML5-E34F26?logo=html5\&logoColor=white)
![CSS](https://img.shields.io/badge/CSS3-1572B6?logo=css3\&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?logo=javascript\&logoColor=black)
![Open-Meteo](https://img.shields.io/badge/API-Open--Meteo-2196F3)
![OpenStreetMap](https://img.shields.io/badge/Mapa-OpenStreetMap-7EBC6F?logo=openstreetmap\&logoColor=white)

</div>

---

## 📖 Sobre o projeto

O **Weather Dashboard** é uma aplicação web interativa desenvolvida para consultar informações meteorológicas de cidades ao redor do mundo.

O usuário pode pesquisar locais como **Brasília**, **São Paulo**, **Tokyo** ou qualquer outra cidade e visualizar um painel completo com informações sobre o clima atual e a previsão dos próximos dias.

Além das informações meteorológicas, a aplicação possui **histórico de pesquisas, cidades favoritas, mapa da localização pesquisada, alertas personalizados e configurações de unidades**.

A interface foi construída com foco em uma experiência visual moderna, utilizando cards translúcidos, efeitos de glassmorphism, fundos dinâmicos baseados nas condições climáticas e layout adaptado para desktop e dispositivos móveis.

---

## ✨ Funcionalidades

### 🔎 Busca por cidades

* Pesquisa de cidades ao redor do mundo
* Geolocalização automática da cidade pesquisada
* Atualização das informações meteorológicas
* Histórico das últimas pesquisas

### 🌡️ Condições meteorológicas

O dashboard apresenta informações como:

* Temperatura atual
* Sensação térmica
* Umidade
* Velocidade do vento
* Pressão atmosférica
* Ponto de orvalho
* Índice UV
* Nascer do sol
* Pôr do sol

### 📅 Previsão do tempo

* Previsão dos próximos dias
* Temperatura máxima
* Temperatura mínima
* Condição climática prevista
* Informações organizadas em cards

### 🗺️ Mapa da cidade

A cidade pesquisada é exibida em um mapa integrado utilizando **OpenStreetMap**, permitindo visualizar sua localização geográfica diretamente pelo dashboard.

### ⭐ Favoritos

* Adição de cidades aos favoritos
* Acesso rápido às cidades salvas
* Persistência dos favoritos no navegador

### 🕘 Histórico de pesquisas

As últimas cidades pesquisadas ficam armazenadas para facilitar novas consultas.

### 🔔 Alertas personalizados

O usuário pode configurar alertas meteorológicos relacionados a:

* 🌧️ Chuva
* ☀️ Temperaturas elevadas
* 💨 Ventos fortes

### ⚙️ Configurações

É possível alterar as unidades utilizadas pelo dashboard, incluindo:

* Unidade de temperatura
* Unidade de velocidade do vento

As preferências são mantidas no navegador.

### 🎨 Interface dinâmica

O visual da aplicação pode mudar de acordo com as condições climáticas da cidade pesquisada.

Entre os cenários estão:

* ☀️ Céu limpo
* ☁️ Nublado
* 🌧️ Chuva
* 🌙 Noite
* ❄️ Neve

---

## 📸 Screenshots

### 🖥️ Dashboard — Desktop

![Weather Dashboard Desktop](./prints/desktop-weather-dashboard-v2.png)

---

### 📱 Dashboard — Mobile

<div align="center">

<img src="./prints/mobile-weather-dashboard-v2.png" alt="Weather Dashboard Mobile" width="350">

</div>

---

### 🛠️ Ferramentas — Desktop

![Weather Dashboard Tools](./prints/weather-dashboard-tools-desktop.png)

---

### 📱 Ferramentas — Mobile

<div align="center">

<img src="./prints/weather-dashboard-tools-mobile.png" alt="Weather Dashboard Tools Mobile" width="350">

</div>

---

### 🌦️ Interface dinâmica

![Weather Dashboard Background](./prints/weather-dashboard-generic-bg.png)

---

## 🛠️ Tecnologias

**HTML5, CSS3, JavaScript, Open-Meteo API, OpenStreetMap, LocalStorage**

### Front-end

* HTML5
* CSS3
* JavaScript

### APIs e serviços

* Open-Meteo Weather API
* Open-Meteo Geocoding API
* OpenStreetMap

### Persistência

* LocalStorage

---

## 🔌 Open-Meteo API

O Weather Dashboard utiliza a **Open-Meteo** para obter informações meteorológicas e localizar as cidades pesquisadas.

A API permite realizar consultas sem necessidade de uma chave de autenticação.

Entre os dados utilizados pela aplicação estão:

* Temperatura
* Sensação térmica
* Umidade
* Pressão atmosférica
* Velocidade do vento
* Índice UV
* Previsão diária
* Horário do nascer do sol
* Horário do pôr do sol
* Coordenadas geográficas

---

## 🏗️ Fluxo da aplicação

```text
Usuário
   │
   ▼
Pesquisa uma cidade
   │
   ▼
Open-Meteo Geocoding API
   │
   ├── Nome da cidade
   ├── Latitude
   ├── Longitude
   └── Localização
   │
   ▼
Open-Meteo Weather API
   │
   ├── Clima atual
   ├── Temperatura
   ├── Previsão
   ├── Índice UV
   └── Dados meteorológicos
   │
   ▼
Weather Dashboard
   │
   ├── Painel meteorológico
   ├── Fundo dinâmico
   ├── Previsão
   ├── Favoritos
   ├── Alertas
   └── OpenStreetMap
```

---

## 📂 Estrutura do projeto

```text
Weather-Dashboard/
│
├── backend/
│
├── interface/
│   ├── assets/
│   ├── index.html
│   ├── styles.css
│   └── app.js
│
├── prints/
│   ├── desktop-weather-dashboard-v2.png
│   ├── mobile-weather-dashboard-v2.png
│   ├── weather-dashboard-generic-bg.png
│   ├── weather-dashboard-overlap-fix.png
│   ├── weather-dashboard-tools-desktop.png
│   ├── weather-dashboard-tools-mobile.png
│   └── weather-dashboard-tools.png
│
└── README.md
```

---

## 💾 Persistência local

O projeto utiliza `localStorage` para armazenar informações diretamente no navegador.

Entre os dados persistidos estão:

* Cidades favoritas
* Histórico de pesquisas
* Configurações de unidades
* Preferências da aplicação

Isso permite que essas informações sejam mantidas mesmo após atualizar ou fechar a página.

---

## 🚀 Como executar

### 1. Clone o repositório

```bash
git clone https://github.com/EmanuelFHX/Weather-Dashboard.git
```

### 2. Acesse a pasta do projeto

```bash
cd Weather-Dashboard
```

### 3. Acesse a interface

```bash
cd interface
```

### 4. Execute a aplicação

Abra o `index.html` utilizando um servidor local.

Uma opção é utilizar a extensão **Live Server** do Visual Studio Code.

---

## 🎯 Objetivos técnicos

O Weather Dashboard foi desenvolvido para praticar e consolidar conhecimentos em:

* Consumo de APIs REST
* JavaScript assíncrono
* Requisições com `fetch`
* Manipulação do DOM
* Tratamento de dados externos
* Geolocalização
* Persistência com `localStorage`
* Interfaces dinâmicas
* Responsividade
* Integração com serviços externos

---

## 🚀 Possíveis melhorias

* Geolocalização pelo dispositivo
* Comparação do clima entre cidades
* Gráficos de temperatura
* Gráficos de precipitação
* Informações sobre qualidade do ar
* Radar meteorológico
* Transformação em PWA
* Notificações meteorológicas no dispositivo

---

## 📈 Status

O **Weather Dashboard** está funcional e pode continuar recebendo novas funcionalidades e melhorias.

---

## 👨‍💻 Autor

**Emanuel Penna**

[![LinkedIn](https://img.shields.io/badge/LinkedIn-Emanuel%20Penna-0A66C2?logo=linkedin\&logoColor=white)](https://www.linkedin.com/in/emanuel-penna)

[![GitHub](https://img.shields.io/badge/GitHub-EmanuelFHX-181717?logo=github\&logoColor=white)](https://github.com/EmanuelFHX)

[![Portfólio](https://img.shields.io/badge/Portfólio-Emanuel%20Penna-6C63FF?logo=vercel\&logoColor=white)](https://portfolio-emanuel-penna.vercel.app/)
