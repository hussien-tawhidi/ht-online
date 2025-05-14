"use client";
interface Variant {
  name: string;
  hex: string;
}

interface props {
  variants: Variant[];
  selectedVariant: string;
  onVariantSelect: (variantName: string) => void;
}

const ColorChoosed = ({
  variants,
  selectedVariant,
  onVariantSelect,
}: props) => {
  return (
    <div className='flex gap-3 mt-3'>
      {variants.map((variant) => (
        <button
          key={variant.name}
          title={variant.name}
          className={`w-8 h-8 rounded-full  ${
            selectedVariant === variant.name ? `border-tusi ring-2` : ""
          } hover:scale-110 transition-transform`}
          style={{ backgroundColor: variant.hex }}
          onClick={() => onVariantSelect(variant.name)}
          aria-label={variant.name}
        />
      ))}
    </div>
  );
};

export default ColorChoosed;
