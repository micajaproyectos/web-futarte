"use client";
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import {
  addToCart,
  removeFromCart,
  setQty as setQtyLogic,
  type CartItem,
} from "@/lib/cart";

type CartContextValue = {
  items: CartItem[];
  isOpen: boolean;
  add: (item: Omit<CartItem, "qty">) => void;
  remove: (id: string) => void;
  setQty: (id: string, qty: number) => void;
  clear: () => void;
  open: () => void;
  close: () => void;
  toggle: () => void;
};

const CartContext = createContext<CartContextValue | null>(null);
const STORAGE_KEY = "futarte-cart";

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [hydrated, setHydrated] = useState(false);

  // Carga desde localStorage tras montar. El setState aquí es intencional: la
  // hidratación debe ocurrir en cliente (localStorage no existe en SSR), así que
  // se exime de la regla react-hooks/set-state-in-effect.
  /* eslint-disable react-hooks/set-state-in-effect */
  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) setItems(JSON.parse(raw) as CartItem[]);
    } catch {
      /* almacenamiento no disponible: carrito vacío */
    }
    setHydrated(true);
  }, []);
  /* eslint-enable react-hooks/set-state-in-effect */

  // Persiste en cada cambio (una vez hidratado).
  useEffect(() => {
    if (!hydrated) return;
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
    } catch {
      /* sin persistencia */
    }
  }, [items, hydrated]);

  const add = useCallback((item: Omit<CartItem, "qty">) => {
    setItems((prev) => addToCart(prev, item));
    setIsOpen(true); // abre el cajón como feedback al añadir
  }, []);
  const remove = useCallback(
    (id: string) => setItems((prev) => removeFromCart(prev, id)),
    [],
  );
  const setQty = useCallback(
    (id: string, qty: number) => setItems((prev) => setQtyLogic(prev, id, qty)),
    [],
  );
  const clear = useCallback(() => setItems([]), []);
  const open = useCallback(() => setIsOpen(true), []);
  const close = useCallback(() => setIsOpen(false), []);
  const toggle = useCallback(() => setIsOpen((o) => !o), []);

  const value = useMemo(
    () => ({ items, isOpen, add, remove, setQty, clear, open, close, toggle }),
    [items, isOpen, add, remove, setQty, clear, open, close, toggle],
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart debe usarse dentro de <CartProvider>");
  return ctx;
}
