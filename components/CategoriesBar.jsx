export default function CategoriesBar({categories, activeCategory, setActiveCategory}){
    return (
        <div className="flex items-center mb-4 scrollbar w-[65vw] lg:w-[85vw] gap-2">
            {categories.map(category => (
                <span key={category} onClick={() => {
                    setActiveCategory(category)
                }} className={`dark:bg-neutral-800 dark:text-white p-2 rounded-xl text-xs cursor-pointer bg-gray-100 transition ${activeCategory === category ? 'bg-neutral-900 dark:bg-white text-white dark:text-neutral-700' :  'dark:hover:bg-neutral-700 hover:bg-gray-200'}`}>{category}</span>
            ))}
        </div>
    )
}