interface JsonLdProps {
  data: object;
}

/** JSON-LD სკრიპტი — „<" ესკეიპდება, რომ HTML-ში ჩასმა უსაფრთხო იყოს */
export function JsonLd({ data }: JsonLdProps) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, "\\u003c") }}
    />
  );
}
