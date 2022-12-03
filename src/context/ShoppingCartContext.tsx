import { createContext, ReactNode, useContext, useState } from "react"

type ShoppingCartProviderProps = {
    children: ReactNode;
}

type CartItem = {
    id: number,
    name: string,
    quantity: number
}

type ShoopingCartContext = {
    getItemQuanrity: (id: number) => number
    increaseCartQuanrity: (id: number) => void
    decresedCardQuanrity: (id: number) => void
    removefromCart: (id: number) => void
}

const ShoppingCartContext = createContext({} as ShoopingCartContext)

export const useShoppingCart = () => {
  return (
    useContext(ShoppingCartContext)
  )
}

export const ShoppingCartProvider = ({ children }: ShoppingCartProviderProps ) => {

    const [cartItems, setCartItems] = useState<CartItem[]>([])

    function getItemQuantity(id: number)  {
        return cartItems.find(item => item.id === id)?.quantity || 0
    }

    function increaseCartQuantity(id: number) {
        setCartItems(currItems => {
            if (currItems.find(item => item.id === id) == null ){
                return [...currItems, { id, quantity: 1 }]
            } else {
                return currItems.map(item => {
                    if (item.id === id) {
                        return { ...item, quantity: item.quantity + 1 }
                    } else {
                        return item
                    }
                })
            }
        })
    }

    return (
        <ShoppingCartContext.Provider value={{ getItemQuantity, increaseCartQuantity }}>
            {children}
        </ShoppingCartContext.Provider>
    )
}