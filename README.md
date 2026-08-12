<div align="center">

# 🌦️ Weather Dashboard

### Consulte o clima de qualquer cidade em uma interface moderna e dinâmica

Uma aplicação web para acompanhar condições meteorológicas em tempo real, previsão dos próximos dias, localização no mapa, favoritos e alertas personalizados.

<br>

![Status](https://img.shields.io/badge/status-Em%20desenvolvimento-F59E0B)
![HTML](https://img.shields.io/badge/HTML5-E34F26?logo=html5\&logoColor=white)
![CSS](https://img.shields.io/badge/CSS3-1572B6?logo=css3\&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?logo=javascript\&logoColor=black)
![Open-Meteo](https://img.shields.io/badge/API-Open--Meteo-2196F3)
![OpenStreetMap](https://img.shields.io/badge/Mapa-OpenStreetMap-7EBC6F?logo=openstreetmap\&logoColor=white)

</div>

---

## 📖 Sobre o projeto

O **Weather Dashboard** é uma aplicação web interativa desenvolvida para consultar informações meteorológicas de cidades ao redor do mundo.

Ao pesquisar locais como **Brasília**, **São Paulo**, **Tokyo** ou qualquer outra cidade, a aplicação apresenta um painel completo com informações sobre as condições climáticas atuais e a previsão dos próximos dias.

Além dos dados meteorológicos, o dashboard conta com **mapa da localização pesquisada, histórico de buscas, cidades favoritas, alertas personalizados e configurações de unidades**.

A interface foi desenvolvida com foco em experiência visual, utilizando cards translúcidos, navegação lateral e fundos que se adaptam dinamicamente às condições climáticas.

---

## ✨ Funcionalidades

### 🔎 Pesquisa de cidades

* Busca de cidades ao redor do mundo
* Geolocalização através da Open-Meteo
* Atualização dos dados meteorológicos a cada pesquisa
* Histórico das últimas cidades pesquisadas

### 🌡️ Condições atuais

Visualização de informações como:

* Temperatura atual
* Sensação térmica
* Umidade
* Velocidade do vento
* Pressão atmosférica
* Ponto de orvalho
* Índice UV
* Nascer do sol
* Pôr do sol

### 📅 Previsão

* Previsão meteorológica dos próximos dias
* Temperaturas máximas e mínimas
* Condições climáticas previstas
* Informações organizadas em cards

### 🗺️ Mapa

* Localização da cidade pesquisada
* Integração com OpenStreetMap
* Visualização geográfica diretamente pelo dashboard

### ⭐ Favoritos

* Adição de cidades aos favoritos
* Acesso rápido às cidades salvas
* Persistência dos favoritos no navegador

### 🔔 Alertas personalizados

Possibilidade de configurar alertas relacionados a:

* 🌧️ Chuva
* ☀️ Temperaturas elevadas
* 💨 Ventos fortes

### ⚙️ Configurações

O usuário pode personalizar unidades utilizadas pelo dashboard, incluindo:

* Temperatura
* Velocidade do vento

As preferências são armazenadas localmente no navegador.

### 🎨 Interface dinâmica

O visual da aplicação muda de acordo com as condições meteorológicas.

Entre os cenários disponíveis estão:

* ☀️ Céu limpo
* ☁️ Nublado
* 🌧️ Chuva
* 🌙 Noite
* ❄️ Neve

---

## 🖥️ Interface

O Weather Dashboard foi desenvolvido com uma interface inspirada em dashboards modernos, utilizando:

* Cards translúcidos
* Efeito glassmorphism
* Navegação lateral
* Ícones meteorológicos
* Fundos dinâmicos
* Hierarquia visual das informações
* Layout adaptado para diferentes tamanhos de tela

---

## 📸 Screenshots

### Dashboard

![Dashboard](./interface/screenshots/dashboard.png)

---

### Previsão do tempo

![Previsão](./interface/screenshots/previsao.png)

---

### Mapa

![Mapa](./interface/screenshots/mapa.png)

---

### Favoritos

![Favoritos](./interface/screenshots/favoritos.png)

> **Nota:** ajuste os nomes acima de acordo com os arquivos existentes em `interface/screenshots/`.

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

O projeto utiliza a **Open-Meteo** para obter dados meteorológicos e realizar a busca geográfica das cidades.

Uma das vantagens da API é permitir o acesso aos dados utilizados pelo Weather Dashboard sem exigir uma chave de API.

Entre os dados utilizados estão:

* Temperatura
* Sensação térmica
* Umidade
* Pressão atmosférica
* Vento
* Índice UV
* Previsão diária
* Nascer e pôr do sol
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
   ├── Latitude
   ├── Longitude
   └── Localização
   │
   ▼
Open-Meteo Weather API
   │
   ├── Clima atual
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
   └── OpenStreetMap
```

---

## 📂 Estrutura do projeto

```text
Weather-Dashboard/
├── backend/
│
└── interface/
    ├── assets/
    ├── screenshots/
    ├── index.html
    ├── styles.css
    └── app.js
```

---

## 💾 Persistência local

O projeto utiliza `localStorage` para manter informações no navegador do usuário.

São armazenados localmente:

* Cidades favoritas
* Histórico de pesquisas
* Configurações de unidades
* Preferências da aplicação

Dessa forma, essas informações permanecem disponíveis mesmo após fechar ou atualizar a página.

---

## 🚀 Como executar

### 1. Clone o repositório

```bash
git clone https://github.com/EmanuelFHX/Weather-Dashboard.git
```

### 2. Entre no projeto

```bash
cd Weather-Dashboard
```

### 3. Abra a interface

Entre na pasta:

```bash
cd interface
```

Execute o projeto utilizando um servidor local, como a extensão **Live Server** do VS Code.

---

## 🗺️ Roadmap

### ✅ Concluído

* [x] Pesquisa por cidade
* [x] Clima atual
* [x] Sensação térmica
* [x] Umidade
* [x] Vento
* [x] Pressão atmosférica
* [x] Ponto de orvalho
* [x] Índice UV
* [x] Nascer e pôr do sol
* [x] Previsão dos próximos dias
* [x] Histórico de pesquisas
* [x] Sistema de favoritos
* [x] Mapa da localização
* [x] Fundos dinâmicos
* [x] Alertas personalizados
* [x] Configuração de unidades
* [x] Persistência com LocalStorage
* [x] Layout responsivo

### 🔮 Futuro

* [ ] Utilizar localização atual do dispositivo
* [ ] Comparação climática entre cidades
* [ ] Gráficos de temperatura
* [ ] Gráficos de precipitação
* [ ] Qualidade do ar
* [ ] Radar meteorológico
* [ ] PWA
* [ ] Notificações de alertas meteorológicos

---

## 🎯 Objetivos técnicos

O Weather Dashboard foi desenvolvido para praticar e consolidar conhecimentos em:

* Consumo de APIs REST
* JavaScript assíncrono
* `fetch`
* Manipulação do DOM
* Tratamento e transformação de dados
* Geolocalização
* Persistência com LocalStorage
* Design responsivo
* Estados dinâmicos de interface
* Integração com serviços externos

---

## 📈 Status

O **Weather Dashboard** está funcional e continua aberto a melhorias e novas funcionalidades.

---

## 👨‍💻 Autor

**Emanuel Penna**

[![LinkedIn](https://img.shields.io/badge/LinkedIn-Emanuel%20Penna-0A66C2?logo=linkedin\&logoColor=white)](https://www.linkedin.com/in/emanuel-penna)

[![GitHub](https://img.shields.io/badge/GitHub-EmanuelFHX-181717?logo=github\&logoColor=white)](https://github.com/EmanuelFHX)

[![Portfólio](https://img.shields.io/badge/Portfólio-Emanuel%20Penna-6C63FF?logo=vercel\&logoColor=white)](https://portfolio-emanuel-penna.vercel.app/)

---

## 📄 Licença

Este projeto está licenciado sob a **MIT License**.

Consulte o arquivo [LICENSE](LICENSE) para mais informações.
