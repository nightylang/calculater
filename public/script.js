document.addEventListener('DOMContentLoaded', () => {
    const basePriceInput = document.getElementById('basePrice');
    const shippingCostInput = document.getElementById('shippingCost');
    const taxAndDocsInput = document.getElementById('taxAndDocs');
    const damageCostInput = document.getElementById('damageCost');
    const damageTypeSelect = document.getElementById('damageType');
    const marginSlider = document.getElementById('marginSlider');
    const resetBtn = document.getElementById('resetBtn');

    const formatCurrency = (num) => {
        return '$' + num.toFixed(2);
    };

    // រូបមន្តគណនាតម្លៃលក់តាម Profit Margin: Selling Price = Cost / (1 - Margin)
    const calculateSellingPrice = (cost, marginPercent) => {
        const marginDecimal = marginPercent / 100;
        if (marginDecimal >= 1) return cost;
        return cost / (1 - marginDecimal);
    };

    const calculateAll = () => {
        const basePrice = parseFloat(basePriceInput.value) || 0;
        const shippingCost = parseFloat(shippingCostInput.value) || 0;
        const taxAndDocs = parseFloat(taxAndDocsInput.value) || 0;
        const damageVal = parseFloat(damageCostInput.value) || 0;
        const damageType = damageTypeSelect.value;
        const customMargin = parseInt(marginSlider.value) || 45;

        // គណនាថ្លៃខូចខាត ឬបាត់បង់
        let calculatedDamage = 0;
        if (damageType === 'percent') {
            calculatedDamage = basePrice * (damageVal / 100);
        } else {
            calculatedDamage = damageVal;
        }

        // ថ្លៃដើមសរុប (Total Landed Cost)
        const totalCost = basePrice + shippingCost + taxAndDocs + calculatedDamage;

        // បង្ហាញការបែងចែកថ្លៃដើម
        document.getElementById('totalCost').textContent = formatCurrency(totalCost);
        document.getElementById('resBase').textContent = formatCurrency(basePrice);
        document.getElementById('resShipping').textContent = formatCurrency(shippingCost);
        document.getElementById('resTax').textContent = formatCurrency(taxAndDocs);
        document.getElementById('resDamage').textContent = formatCurrency(calculatedDamage);

        // បង្ហាញ % Margin ដែលបានជ្រើសរើស
        document.getElementById('marginDisplay').textContent = customMargin + '%';
        document.getElementById('customTag').textContent = customMargin + '%';

        // គណនាតម្លៃលក់ 30%, Custom%, និង 60%
        const price30 = calculateSellingPrice(totalCost, 30);
        const priceCustom = calculateSellingPrice(totalCost, customMargin);
        const price60 = calculateSellingPrice(totalCost, 60);

        document.getElementById('price30').textContent = formatCurrency(price30);
        document.getElementById('profit30').textContent = formatCurrency(price30 - totalCost);

        document.getElementById('priceCustom').textContent = formatCurrency(priceCustom);
        document.getElementById('profitCustom').textContent = formatCurrency(priceCustom - totalCost);

        document.getElementById('price60').textContent = formatCurrency(price60);
        document.getElementById('profit60').textContent = formatCurrency(price60 - totalCost);
    };

    // ចាប់យករាល់ការផ្លាស់ប្តូរទិន្នន័យ
    const inputs = [basePriceInput, shippingCostInput, taxAndDocsInput, damageCostInput, damageTypeSelect, marginSlider];
    inputs.forEach(input => {
        input.addEventListener('input', calculateAll);
    });

    // ប៊ូតុងកំណត់ឡើងវិញ
    resetBtn.addEventListener('click', () => {
        basePriceInput.value = '';
        shippingCostInput.value = '';
        taxAndDocsInput.value = '';
        damageCostInput.value = '0';
        damageTypeSelect.value = 'percent';
        marginSlider.value = '10';
        calculateAll();
    });

    // គណនាលើកដំបូងពេលបើកទំព័រ
    calculateAll();
});