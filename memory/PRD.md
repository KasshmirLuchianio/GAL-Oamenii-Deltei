# PRD - GAL Oamenii Deltei Landing Page

## Problem Statement Original
Create a landing page for a consulting service with an appointment calendar, video testimonials, downloadable case studies, blog previews, and sleek corporate UI.

## Detalii Client
- **Companie**: GAL Oamenii Deltei
- **Servicii**: Consultanță pentru proiecte europene pe fonduri rurale (LEADER, FEADR)
- **Locație**: Delta Dunării, Județul Tulcea, România
- **Limba**: Română

## Arhitectură Implementată
- **Frontend**: React 19 cu Vite
- **UI Framework**: Shadcn/UI components
- **Styling**: Tailwind CSS + Custom Dark Theme
- **Icons**: Lucide React
- **Routing**: React Router DOM
- **Toasts**: Sonner

## Design System Aplicat
**Green Dark Theme**:
- Background principal: #000000
- Background secundar: #121212
- Accent color: #00FFD1 (cyan-green)
- Text: #FFFFFF (high contrast)
- Butoane cu colțuri ascuțite (border-radius: 0)
- Regula 90/10: 90% suprafață neagră, 10% culoare accent

## Ce A Fost Implementat (15 Decembrie 2024)

### ✅ Componente Create
1. **Header** - Navigare fixă cu logo și meniu
2. **Hero Section** - Mesaj puternic, statistici, CTA-uri
3. **Servicii** - Grid cu 6 tipuri de consultanță
4. **Calendar Programări** - Sistem custom cu:
   - Shadcn Calendar pentru selectare dată
   - Time slots pentru ore (09:00 - 17:00)
   - Formular contact complet
   - Validare și notificări
5. **Testimoniale** - 4 povești de succes cu rating 5 stele
6. **Case Studies** - 3 studii de caz (1 cu PDF descărcabil)
7. **Blog Preview** - 4 articole recente
8. **Footer** - Contact, link-uri rapide, social media

### 📊 Mock Data
Toate datele sunt în `/app/frontend/src/data/mockData.js`:
- 6 servicii de consultanță
- 4 testimoniale cu imagini
- 3 case studies (SDL GAL Oamenii Deltei + 2 mock)
- 4 articole blog
- 5 FAQ-uri
- 9 ore disponibile pentru programări (09:00-17:00)

### 🎨 Design Highlights
- Dark theme professional (#000000, #00FFD1)
- Typography system: display-huge (66px) → body-small (16px)
- Smooth scroll navigation
- Hover effects și micro-animations
- Responsive design (mobile, tablet, desktop)
- Accessibility considerat

## Features Implementate

### ✅ Funcțional cu Mock Data
- [x] Header cu navigare smooth scroll
- [x] Hero section cu statistici
- [x] Grid servicii (6 carduri)
- [x] Calendar programări custom
- [x] Formular contact cu validare
- [x] Testimoniale cu rating vizual
- [x] Case studies cu download
- [x] Blog preview cu categorii
- [x] Footer complet
- [x] Toast notifications
- [x] Responsive design

### 🔄 Pentru Backend (Următoarea Fază)
- [ ] API pentru programări (POST /api/appointments)
- [ ] API pentru contact form (POST /api/contact)
- [ ] Gestionare disponibilitate calendar
- [ ] Email notifications
- [ ] Admin panel pentru programări
- [ ] Upload/management case studies
- [ ] Blog CMS backend

## Prioritized Backlog

### P0 - Critical (Next Sprint)
1. Backend API pentru programări
2. Integrare email pentru notificări
3. Upload real pentru case study PDF

### P1 - Important
1. Admin dashboard pentru gestionare programări
2. Blog backend cu CMS
3. Analytics integration
4. SEO optimization

### P2 - Nice to Have
1. Video testimoniale (în loc de imagini)
2. Chat live support
3. Multi-language support (EN)
4. Advanced filtering pentru blog

## Next Action Items
1. ✅ Frontend complet cu mock data - DONE
2. 📸 Screenshot verification - DONE
3. 🎯 NEXT: Backend development pentru:
   - Appointments API
   - Contact form API
   - Email integration
4. Testing complet frontend + backend
5. Deploy production

## Technical Stack
- React 19.0.0
- React Router DOM 7.5.1
- Tailwind CSS 3.4.17
- Shadcn/UI components
- Lucide React 0.507.0
- Sonner (toasts)
- date-fns 4.1.0
- Axios 1.8.4

## Document Referință
- SDL GAL Oamenii Deltei 2023-2027 (furnizat de client)
- Strategia: Includerea produselor locale și patrimoniului cultural în oferta turistică
- Buget total: 1.751.488 EUR (FEADR + FSE+)
