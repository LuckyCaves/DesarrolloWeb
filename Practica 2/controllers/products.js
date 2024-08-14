
class Product {
    constructor(title, description, imageUrl, unit, stock, pricePerUnit, category) {
        this.setTitle(title);
        this.setDescription(description);
        this.setImageUrl(imageUrl);
        this.setUnit(unit);
        this.setStock(stock);
        this.setPricePerUnit(pricePerUnit);
        this.setCategory(category);
        this.uuid = generateUUID();
    }
    
    setUuid(uuid) {
        throw new ProductException("Product uuids are auto-generated");
    }
    
    setTitle(title) {
        if(title.length < 1)
        throw new ProductException("Title must be at least 1 character long");
    
        this.title = title;
    }

    setDescription(description) {
        if(description.length < 1)
        throw new ProductException("Description must be at least 1 character long");

        this.description = description;
    }

    setImageUrl(imageUrl) {
        if(imageUrl.length < 1)
        throw new ProductException("Invalid image url");

        this.imageUrl = imageUrl;
    }

    setUnit(unit) {
        if(unit.length < 1)
        throw new ProductException("Unit must be at least 1 character long");

        this.unit = unit;
    }

    setStock(stock) {
        if(stock < 0)
        throw new ProductException("Stock must be a positive number");

        this.stock = stock;
    }

    setPricePerUnit(pricePerUnit) {
        if(pricePerUnit < 0)
        throw new ProductException("Price per unit must be a positive number");

        this.pricePerUnit = pricePerUnit;
    }

    setCategory(category) {
        if(category.length < 1)
        throw new ProductException("Category must be at least 1 character long");

        this.category = category;
    }

    getUuid() {
        return this.uuid;
    }

    getTitle() {
        return this.title;
    }

    getDescription() {
        return this.description;
    }
    
    getImageUrl() {
        return this.imageUrl;
    }
    
    getUnit() {
        return this.unit;
    }
    
    getStock() {
        return this.stock;
    }
    
    getPricePerUnit() {
        return this.pricePerUnit;
    }

    getCategory() {
        return this.category;
    }
    
    
    static createFromJson(jsonValue)
    {
            jsonValue = JSON.parse(jsonValue);
            let product = new Product(jsonValue.uuid, jsonValue.title, jsonValue.description, jsonValue.imageUrl, jsonValue.unit, jsonValue.stock, jsonValue.pricePerUnit, jsonValue.category);
            return product;
        }
        
        static createFromObject(obj)
        {
                let product = new Product(obj.uuid, obj.title, obj.description, obj.imageUrl, obj.unit, obj.stock, obj.pricePerUnit, obj.category);
                return product;
            }
            
            static cleanObject(obj)
            {
        let product = this.createFromObject(obj);
        return product;
    }
}

class ProductException{
    constructor(errorMessage){
        this.errorMessage = errorMessage;
    }
}