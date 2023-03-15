import { useEffect, useRef, useState } from "react";

import { useCategories } from "../../apollo/getCategories";

import { useSelectedCategory } from "../../apollo/selectCategory";

import { useAppDispatch, useAppSelector } from "../../store/store";

import Styles from "./sidebar.module.css";

const Categories = () => {

    const [categories, setCategories] = useCategories();

    const [isOpen, setIsOpen] = useState(false);

    const [selectedCategory, setSelectedCategory] = useSelectedCategory();

    const [highlightedIndex, setHighlightedIndex] = useState(0);

    const selectRef = useRef<HTMLDivElement>(null);

    const isOptionSelected = (selectedOption: string) => {

        return selectedOption === selectedCategory;

    } 

    const handler = (e: KeyboardEvent) => {

        e.stopPropagation();

        if (e.target !== selectRef.current) return;

        switch (e.code) {
            
            case "Enter":
            case "Space":
                
                setIsOpen(prev => !prev);

                if (isOpen) selectOption(categories[highlightedIndex]);

                break;
            
            case "ArrowUp":
            case "ArrowDown":

                if (!isOpen) {

                    setIsOpen(true);

                    break;

                }

                let i = highlightedIndex + (e.code === "ArrowDown" ? 1 : -1);

                if (i >= 0 && i < categories.length) setHighlightedIndex(i);

                break;
            
            case "Escape":

                setIsOpen(false);

                break;

        }

    }

    const selectOption = (option: string) => {

        setSelectedCategory(option);

    }

    useEffect(() => {

        setCategories("https://fakestoreapi.com/products/categories");

    }, []);

    useEffect(() => {

        selectRef.current?.addEventListener("keydown", handler);

        return () => selectRef.current?.removeEventListener("keydown", handler);

    }, [isOpen, highlightedIndex]);

    return (<div className={Styles.categories}>

        <h2 className={Styles["sidebar-title"]}>Categories</h2>

        <div
            
            ref={selectRef}
            
            tabIndex={0}
            
            className={Styles.select}

            onClick={_ => setIsOpen(prev => !prev)}

            onBlur={_ => setIsOpen(false)}
        
        >

            <div className={Styles["current-option"]}>{
                
                selectedCategory ? selectedCategory : "All"
            
            }</div>

            <span className={Styles.caret}></span>
            
            <ul className={`${Styles.options} ${isOpen ? Styles.show : ""}`}>{

                categories.map((category, index) => {

                    return (

                        <li
                            
                            key={category}
                            
                            className={`
                            
                                ${Styles.option}

                                ${isOptionSelected(category) ? Styles.selected : ""}

                                ${highlightedIndex === index ? Styles.highlight : ""}
                                
                            `}

                            onClick={_ => {

                                selectOption(category);

                            }}

                            onMouseEnter={e => {

                                e.stopPropagation();

                                setHighlightedIndex(index);

                            }}
                        
                        >
                            
                            {category}
                        
                        </li>

                    );

                })
                
            }</ul>

        </div>

    </div>);

}

export default Categories;