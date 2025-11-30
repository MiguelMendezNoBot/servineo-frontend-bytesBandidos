    // src/app/services/translation/dictionary.service.ts

    // Diccionario extenso de términos comunes en búsquedas de trabajos
    const translationDictionary: { [key: string]: { en: string; es: string } } = {
    // Profesiones/Oficios
    'electricista': { en: 'electrician', es: 'electricista' },
    'plomero': { en: 'plumber', es: 'plomero' },
    'fontanero': { en: 'plumber', es: 'fontanero' },
    'gasfitero': { en: 'plumber', es: 'gasfitero' },
    'Carpintero': { en: 'Carpenter', es: 'Carpintero' },
    'pintor': { en: 'painter', es: 'pintor' },
    'albañil': { en: 'mason', es: 'albañil' },
    'jardinero': { en: 'gardener', es: 'jardinero' },
    'mecánico': { en: 'mechanic', es: 'mecánico' },
    'cerrajero': { en: 'locksmith', es: 'cerrajero' },
    'técnico': { en: 'technician', es: 'técnico' },
    'reparación': { en: 'repair', es: 'reparación' },
    'instalación': { en: 'installation', es: 'instalación' },
    'mantenimiento': { en: 'maintenance', es: 'mantenimiento' },
    
    // Electrodomésticos y tecnología
    'electrodomésticos': { en: 'appliances', es: 'electrodomésticos' },
    'refrigerador': { en: 'refrigerator', es: 'refrigerador' },
    'lavadora': { en: 'washing machine', es: 'lavadora' },
    'secadora': { en: 'dryer', es: 'secadora' },
    'televisor': { en: 'television', es: 'televisor' },
    'computadora': { en: 'computer', es: 'computadora' },
    'celular': { en: 'cell phone', es: 'celular' },
    'tablet': { en: 'tablet', es: 'tablet' },
    
    // Servicios del hogar
    'limpieza': { en: 'cleaning', es: 'limpieza' },
    'jardinería': { en: 'gardening', es: 'jardinería' },
    'pintura': { en: 'painting', es: 'pintura' },
    'construcción': { en: 'construction', es: 'construcción' },
    'reformas': { en: 'renovations', es: 'reformas' },
    'remodelación': { en: 'remodeling', es: 'remodelación' },
    
    // Términos de búsqueda comunes
    'casa': { en: 'house', es: 'casa' },
    'apartamento': { en: 'apartment', es: 'apartamento' },
    'oficina': { en: 'office', es: 'oficina' },
    'local': { en: 'premises', es: 'local' },
    'emergencia': { en: 'emergency', es: 'emergencia' },
    'urgente': { en: 'urgent', es: 'urgente' },
    'profesional': { en: 'professional', es: 'profesional' },
    'calificado': { en: 'qualified', es: 'calificado' },
    'experto': { en: 'expert', es: 'experto' },
    
    // Términos técnicos
    'eléctrico': { en: 'electrical', es: 'eléctrico' },
    'hidráulico': { en: 'hydraulic', es: 'hidráulico' },
    'sanitario': { en: 'sanitary', es: 'sanitario' },
    'estructura': { en: 'structure', es: 'estructura' },
    'cimientos': { en: 'foundations', es: 'cimientos' },
    
    // Términos generales
    'presupuesto': { en: 'budget', es: 'presupuesto' },
    'cotización': { en: 'quote', es: 'cotización' },
    'garantía': { en: 'warranty', es: 'garantía' },
    'calidad': { en: 'quality', es: 'calidad' },
    'servicio': { en: 'service', es: 'servicio' },
    
    // Términos que ya están en ambas versiones
    'electric': { en: 'electric', es: 'electric' },
    'electrician': { en: 'electrician', es: 'electrician' },
    'elec': { en: 'elec', es: 'elec' },
    'electronic': { en: 'electronic', es: 'electronic' },
    'electronics': { en: 'electronics', es: 'electronics' },
    };

    /**
     * Traduce un texto usando el diccionario
     */
    export function translateWithDictionary(text: string, targetLang: 'en' | 'es'): string {
    if (targetLang === 'es') {
        return text; // No traducir si ya está en español
    }

    const lowerText = text.toLowerCase().trim();
    
    // Buscar traducción exacta
    if (translationDictionary[lowerText]) {
        const translated = translationDictionary[lowerText][targetLang];
        console.log(`✅ Dictionary translation: "${text}" -> "${translated}"`);
        return translated;
    }
    
    // Buscar por palabras contenidas (para términos compuestos)
    for (const [key, translations] of Object.entries(translationDictionary)) {
        if (lowerText.includes(key)) {
        const translated = text.replace(new RegExp(key, 'gi'), (match) => {
            // Mantener el caso original
            if (match === match.toUpperCase()) {
            return translations[targetLang].toUpperCase();
            } else if (match[0] === match[0].toUpperCase()) {
            return translations[targetLang].charAt(0).toUpperCase() + translations[targetLang].slice(1);
            } else {
            return translations[targetLang];
            }
        });
        console.log(`Dictionary partial translation: "${text}" -> "${translated}"`);
        return translated;
        }
    }
    
    // Si no se encuentra traducción, devolver original
    console.log(`No translation found, keeping: "${text}"`);
    return text;
    }

    /**
     * Traduce un array de sugerencias usando el diccionario
     */
    export function translateSuggestions(
    suggestions: string[], 
    targetLang: 'en' | 'es'
    ): string[] {
    if (targetLang === 'es' || suggestions.length === 0) {
        return suggestions;
    }

    console.log(`Translating ${suggestions.length} suggestions using dictionary to ${targetLang}`);
    
    const translated = suggestions.map(suggestion => 
        translateWithDictionary(suggestion, targetLang)
    );
    
    console.log('Dictionary translations completed:', translated);
    return translated;
    }