function goods(id, name, category, price, src, country, sales, number){
    this.id = id;
    this.name = name;
    this.category = category;
    this.price = price;
    this.src = src;
    this.country = country;
    this.sales = sales;
    this.number = number;
    this.getId = function(){        return this.id;    }
    this.getName = function(){        return this.name;    }
    this.getCategory = function(){        return this.category;    }
    this.getPrice = function(){        return this.price;    }
    this.getSrc = function(){        return this.src;    }
    this.getCountry = function(){        return this.country;    }
    this.getSales = function(){        return this.sales;    }
    this.getNumber = function(){        return this.number;    }
}