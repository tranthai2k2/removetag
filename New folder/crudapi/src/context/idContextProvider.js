import { useState, createContext } from "react";

const IdContext = createContext(); // Đổi tên context theo quy chuẩn PascalCase

function IdProvider({ children }) { // Đổi tên component và thêm prop children
    const [id, setId] = useState(-1);

    return (
        <IdContext.Provider value={{ id, setId }}>
            {children}
        </IdContext.Provider>
    );
}

export { IdContext, IdProvider };
