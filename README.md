# Frontend Repository – Commit Convention Guide

## 📌 Objetivo
Este repositorio frontend adopta **Conventional Commits** para mantener un historial de cambios claro, profesional y estandarizado entre todos los miembros del equipo.

Esta convención es **obligatoria** para todos los commits.

---

## 🧱 Estructura del mensaje de commit

```
<type>(optional-scope): <short description>
```

### Ejemplo
```
feat(login): add remember me option
```

---

## 🏷️ Tipos de commit permitidos

| Tipo | Uso |
|----|----|
| feat | Nueva funcionalidad UI |
| fix | Corrección de bugs visuales o lógicos |
| style | CSS, Tailwind, estilos, formato |
| refactor | Refactor de componentes |
| perf | Mejora de rendimiento |
| test | Tests unitarios / e2e |
| docs | Documentación |
| build | Build, Vite, Webpack |
| ci | Pipelines CI/CD |
| chore | Configuraciones generales |

---

## 🎯 Scopes recomendados (Frontend)

Usar el scope para indicar el área afectada:

```
feat(auth)
fix(navbar)
style(buttons)
refactor(components)
perf(images)
build(vite)
```

Scopes comunes:
- auth
- layout
- navbar
- footer
- components
- pages
- hooks
- services
- assets
- styles

---

## 📏 Reglas obligatorias

✔ Usar inglés  
✔ Tiempo imperativo (add, fix, update)  
✔ Máx. 72 caracteres  
✔ Todo en minúsculas  
❌ No usar punto final  
❌ No mensajes genéricos  

### Correcto
```
fix(navbar): prevent overflow on mobile
```

### Incorrecto
```
Navbar fixed.
```

---

## 🔐 Enforzar la convención (Recomendado)

### Instalar dependencias
```bash
npm install -D commitlint @commitlint/config-conventional husky
```

### commitlint.config.js
```js
module.exports = {
  extends: ['@commitlint/config-conventional'],
};
```

### Configurar Husky
```bash
npx husky install
npx husky add .husky/commit-msg "npx --no-install commitlint --edit $1"
```

Ahora los commits inválidos serán rechazados.

---

## 📦 Ejemplos reales de commits

```
feat(components): add reusable modal
fix(styles): resolve dark mode contrast issue
style(buttons): unify primary button styles
refactor(pages): split dashboard into sections
build(vite): optimize production build
```

---

## 📢 Regla del equipo

> Ningún commit que no cumpla esta convención será aceptado en main/develop.

---

## ✅ Beneficios
- Historial limpio
- Mejor revisión de PR
- Versionado automático
- Trabajo en equipo profesional

---

📄 Documento obligatorio para todo el equipo frontend.
