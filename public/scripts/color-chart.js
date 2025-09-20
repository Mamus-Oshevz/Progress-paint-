document.addEventListener('DOMContentLoaded', () => {
    const colorGrid = document.querySelector('.color-grid');
    const loadMoreButton = document.createElement('button');
    loadMoreButton.textContent = 'See All Our Colors';
    loadMoreButton.classList.add('load-more-btn');
    
    const contentSection = document.querySelector('.content-section');
    contentSection.appendChild(loadMoreButton);

    const defaultColors = [
        { "name": "Crimson", "hex": "#DC143C" },
        { "name": "Orange", "hex": "#FFA500" },
        { "name": "Gold", "hex": "#FFD700" },
        { "name": "Green", "hex": "#008000" },
        { "name": "Blue", "hex": "#0000FF" },
        { "name": "Indigo", "hex": "#4B0082" }
    ];

    function createColorSwatch(color) {
        const swatch = document.createElement('div');
        swatch.classList.add('color-swatch');
        swatch.style.backgroundColor = color.hex;

        const colorName = document.createElement('div');
        colorName.classList.add('color-name');
        colorName.textContent = color.name;

        const colorHex = document.createElement('div');
        colorHex.classList.add('color-hex');
        colorHex.textContent = color.hex;

        swatch.appendChild(colorName);
        swatch.appendChild(colorHex);

        return swatch;
    }

    function displayInitialColors() {
        colorGrid.innerHTML = '';
        defaultColors.forEach(color => {
            const swatch = createColorSwatch(color);
            colorGrid.appendChild(swatch);
        });
    }

    async function displayAllColors() {
        try {
            const response = await fetch('colors.json');
            const data = await response.json();
            
            colorGrid.innerHTML = ''; 

            data.categories.forEach(category => {
                const categoryTitle = document.createElement('h3');
                categoryTitle.textContent = category.name;
                categoryTitle.classList.add('color-category-title');
                colorGrid.appendChild(categoryTitle);

                category.colors.forEach(color => {
                    const swatch = createColorSwatch(color);
                    colorGrid.appendChild(swatch);
                });
            });

        } catch (error) {
            console.error('Error fetching color data:', error);
            colorGrid.innerHTML = '<p>Error loading colors. Please try again later.</p>';
        }
    }

    displayInitialColors();

    loadMoreButton.addEventListener('click', () => {
        displayAllColors();
        loadMoreButton.style.display = 'none';
    });
});
