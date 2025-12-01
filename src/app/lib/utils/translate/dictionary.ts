    // src/app/services/translation/dictionary.service.ts

    // Diccionario extenso de términos comunes en búsquedas de trabajos
    const translationDictionary: { [key: string]: { en: string; es: string } } = {
    // Profesiones/Oficios - TODOS en minúscula
    'electricista': { en: 'electrician', es: 'electricista' },
    'electrician': { en: 'electrician', es: 'electricista' }, // ⭐ INVERSA
    'plomero': { en: 'plumber', es: 'plomero' },
    'plumber': { en: 'plumber', es: 'plomero' }, // ⭐ INVERSA
    'fontanero': { en: 'plumber', es: 'fontanero' },
    'gasfitero': { en: 'plumber', es: 'gasfitero' },
    'plomeria': { en: 'plumbing', es: 'plomeria' },
    'plumbing': { en: 'plumbing', es: 'plomeria' }, // ⭐ INVERSA
    'carpintero': { en: 'carpenter', es: 'carpintero' },
    'carpenter': { en: 'carpenter', es: 'carpintero' }, // ⭐ INVERSA
    'carpintería': { en: 'carpentry', es: 'carpintería' },
    'carpentry': { en: 'carpentry', es: 'carpintería' }, // ⭐ INVERSA
    'especializado': { en: 'specialized', es: 'especializado' },
    'specialized': { en: 'specialized', es: 'especializado' }, // ⭐ INVERSA
    'pintor': { en: 'painter', es: 'pintor' },
    'painter': { en: 'painter', es: 'pintor' }, // ⭐ INVERSA
    'albañil': { en: 'mason', es: 'albañil' },
    'mason': { en: 'mason', es: 'albañil' }, // ⭐ INVERSA
    'jardinero': { en: 'gardener', es: 'jardinero' },
    'gardener': { en: 'gardener', es: 'jardinero' }, // ⭐ INVERSA
    'mecánico': { en: 'mechanic', es: 'mecánico' },
    'mechanic': { en: 'mechanic', es: 'mecánico' }, // ⭐ INVERSA
    'cerrajero': { en: 'locksmith', es: 'cerrajero' },
    'locksmith': { en: 'locksmith', es: 'cerrajero' }, // ⭐ INVERSA
    'técnico': { en: 'technician', es: 'técnico' },
    'technician': { en: 'technician', es: 'técnico' }, // ⭐ INVERSA
    'reparación': { en: 'repair', es: 'reparación' },
    'repair': { en: 'repair', es: 'reparación' }, // ⭐ INVERSA
    'instalación': { en: 'installation', es: 'instalación' },
    'installation': { en: 'installation', es: 'instalación' }, // ⭐ INVERSA
    'mantenimiento': { en: 'maintenance', es: 'mantenimiento' },
    'maintenance': { en: 'maintenance', es: 'mantenimiento' }, // ⭐ INVERSA

    // Electrodomésticos y tecnología
    'electrodomésticos': { en: 'appliances', es: 'electrodomésticos' },
    'appliances': { en: 'appliances', es: 'electrodomésticos' }, // ⭐ INVERSA
    'refrigerador': { en: 'refrigerator', es: 'refrigerador' },
    'refrigerator': { en: 'refrigerator', es: 'refrigerador' }, // ⭐ INVERSA
    'lavadora': { en: 'washing machine', es: 'lavadora' },
    'washing machine': { en: 'washing machine', es: 'lavadora' }, // ⭐ INVERSA
    'secadora': { en: 'dryer', es: 'secadora' },
    'dryer': { en: 'dryer', es: 'secadora' }, // ⭐ INVERSA
    'televisor': { en: 'television', es: 'televisor' },
    'television': { en: 'television', es: 'televisor' }, // ⭐ INVERSA
    'computadora': { en: 'computer', es: 'computadora' },
    'computer': { en: 'computer', es: 'computadora' }, // ⭐ INVERSA
    'celular': { en: 'cell phone', es: 'celular' },
    'cell phone': { en: 'cell phone', es: 'celular' }, // ⭐ INVERSA
    'tablet': { en: 'tablet', es: 'tablet' },

    // Servicios del hogar
    'limpieza': { en: 'cleaning', es: 'limpieza' },
    'cleaning': { en: 'cleaning', es: 'limpieza' }, // ⭐ INVERSA
    'jardinería': { en: 'gardening', es: 'jardinería' },
    'gardening': { en: 'gardening', es: 'jardinería' }, // ⭐ INVERSA
    'pintura': { en: 'painting', es: 'pintura' },
    'painting': { en: 'painting', es: 'pintura' }, // ⭐ INVERSA
    'construcción': { en: 'construction', es: 'construcción' },
    'construction': { en: 'construction', es: 'construcción' }, // ⭐ INVERSA
    'reformas': { en: 'renovations', es: 'reformas' },
    'renovations': { en: 'renovations', es: 'reformas' }, // ⭐ INVERSA
    'remodelación': { en: 'remodeling', es: 'remodelación' },
    'remodeling': { en: 'remodeling', es: 'remodelación' }, // ⭐ INVERSA

    // Términos de búsqueda comunes
    'casa': { en: 'house', es: 'casa' },
    'house': { en: 'house', es: 'casa' }, // ⭐ INVERSA
    'apartamento': { en: 'apartment', es: 'apartamento' },
    'apartment': { en: 'apartment', es: 'apartamento' }, // ⭐ INVERSA
    'oficina': { en: 'office', es: 'oficina' },
    'office': { en: 'office', es: 'oficina' }, // ⭐ INVERSA
    'local': { en: 'premises', es: 'local' },
    'premises': { en: 'premises', es: 'local' }, // ⭐ INVERSA
    'emergencia': { en: 'emergency', es: 'emergencia' },
    'emergency': { en: 'emergency', es: 'emergencia' }, // ⭐ INVERSA
    'urgente': { en: 'urgent', es: 'urgente' },
    'urgent': { en: 'urgent', es: 'urgente' }, // ⭐ INVERSA
    'profesional': { en: 'professional', es: 'profesional' },
    'professional': { en: 'professional', es: 'profesional' }, // ⭐ INVERSA
    'calificado': { en: 'qualified', es: 'calificado' },
    'qualified': { en: 'qualified', es: 'calificado' }, // ⭐ INVERSA
    'experto': { en: 'expert', es: 'experto' },
    'expert': { en: 'expert', es: 'experto' }, // ⭐ INVERSA

    // Términos técnicos
    'eléctrico': { en: 'electrical', es: 'eléctrico' },
    'electrical': { en: 'electrical', es: 'eléctrico' }, // ⭐ INVERSA
    'hidráulico': { en: 'hydraulic', es: 'hidráulico' },
    'hydraulic': { en: 'hydraulic', es: 'hidráulico' }, // ⭐ INVERSA
    'sanitario': { en: 'sanitary', es: 'sanitario' },
    'sanitary': { en: 'sanitary', es: 'sanitario' }, // ⭐ INVERSA
    'estructura': { en: 'structure', es: 'estructura' },
    'structure': { en: 'structure', es: 'estructura' }, // ⭐ INVERSA
    'cimientos': { en: 'foundations', es: 'cimientos' },
    'foundations': { en: 'foundations', es: 'cimientos' }, // ⭐ INVERSA

    // Términos generales
    'presupuesto': { en: 'budget', es: 'presupuesto' },
    'budget': { en: 'budget', es: 'presupuesto' }, // ⭐ INVERSA
    'cotización': { en: 'quote', es: 'cotización' },
    'quote': { en: 'quote', es: 'cotización' }, // ⭐ INVERSA
    'garantía': { en: 'warranty', es: 'garantía' },
    'warranty': { en: 'warranty', es: 'garantía' }, // ⭐ INVERSA
    'calidad': { en: 'quality', es: 'calidad' },
    'quality': { en: 'quality', es: 'calidad' }, // ⭐ INVERSA
    'servicio': { en: 'service', es: 'servicio' },
    'service': { en: 'service', es: 'servicio' }, // ⭐ INVERSA

    // Términos específicos
    'car': { en: 'car', es: 'car' },
    'carp': { en: 'carp', es: 'carp' },
    'carlo': { en: 'carlo', es: 'carlo' },
    'carlos': { en: 'carlos', es: 'carlos' },
    'electric': { en: 'electric', es: 'electric' },
    'elec': { en: 'elec', es: 'elec' },
    'electronic': { en: 'electronic', es: 'electronic' },
    'electronics': { en: 'electronics', es: 'electronics' },
    'en': { en: 'on', es: 'en' },
    'on': { en: 'on', es: 'en' }, // ⭐ INVERSA
    'de': { en: 'the', es: 'de' },
    'the': { en: 'the', es: 'de' }, // ⭐ INVERSA (cuidado con esto)
    'canaletas': { en: 'gutters', es: 'canaletas' },
    'gutters': { en: 'gutters', es: 'canaletas' }, // ⭐ INVERSA
    'automatico': { en: 'automatic', es: 'automatico' },
    'automatic': { en: 'automatic', es: 'automatico' }, // ⭐ INVERSA
    'automáticos': { en: 'automatics', es: 'automatico' },
    'automatics': { en: 'automatics', es: 'automatico' }, // ⭐ INVERSA
    'hogar': { en: 'house', es: 'hogar' },
    'hola': { en: 'hello', es: 'hola' },
    'hello': { en: 'hello', es: 'hola' }, // ⭐ INVERSA
    'hormigón': { en: 'concrete', es: 'hormigon' },
    'concrete': { en: 'concrete', es: 'hormigon' }, // ⭐ INVERSA
    };

    function preserveCapitalization(original: string, translation: string): string {
    if (original === original.toUpperCase()) {
        return translation.toUpperCase();
    } else if (original[0] === original[0].toUpperCase()) {
        return translation.charAt(0).toUpperCase() + translation.slice(1);
    } else {
        return translation;
    }
    }

    /**
     * Traduce un array de sugerencias usando el diccionario
     */
    export function translateSuggestions(
    suggestions: string[],
    targetLang: 'en' | 'es'
    ): string[] {
    if (suggestions.length === 0) {
        return suggestions;
    }

    console.log(`🔍 Translating ${suggestions.length} suggestions to ${targetLang}`);
    console.log(`🔍 Original suggestions:`, suggestions);

    const translated = suggestions.map((suggestion) =>
        translateWithDictionary(suggestion, targetLang)
    );

    console.log(`🔍 Translated suggestions:`, translated);
    return translated;
    }

    /**
     * Traduce un texto individual usando el diccionario
     */
    export function translateWithDictionary(text: string, targetLang: 'en' | 'es'): string {
    console.log(`🔍 Attempting to translate: "${text}" to ${targetLang}`);

    const normalizedText = text.toLowerCase().trim();

    // 1. Búsqueda EXACTA
    const exactKey = Object.keys(translationDictionary).find(
        (key) => key.toLowerCase() === normalizedText
    );

    if (exactKey) {
        const translation = translationDictionary[exactKey][targetLang];
        console.log(`✅ Exact dictionary match: "${text}" -> "${translation}"`);
        return preserveCapitalization(text, translation);
    }

    console.log(`❌ No exact match for: "${text}" (normalized: "${normalizedText}")`);

    // 2. Búsqueda por PALABRAS CONTENIDAS
    let translatedText = text;
    let foundAnyMatch = false;

    const sortedKeys = Object.keys(translationDictionary).sort((a, b) => b.length - a.length);

    for (const dictKey of sortedKeys) {
        const regex = new RegExp(`\\b${dictKey}\\b`, 'gi'); 
        if (regex.test(text)) {
        foundAnyMatch = true;
        translatedText = translatedText.replace(regex, (match) => {
            const translation = translationDictionary[dictKey][targetLang];
            console.log(`🔄 Partial match: "${match}" -> "${translation}" in "${text}"`);
            return preserveCapitalization(match, translation);
        });
        }
    }

    if (foundAnyMatch) {
        console.log(`✅ Final translated: "${text}" -> "${translatedText}"`);
        return translatedText;
    }

    console.log(`❌ No dictionary translation for: "${text}"`);
    return text;
    }