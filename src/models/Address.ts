class Address {
    private address1: string;

    private address2: string;

    private city: string;

    private state: string;

    private zip: string;

    private country: string;

    private createdAt: Date;

    private updatedAt: Date;

    private id ? : string;
    
    init(address1: string,
        address2: string,
        city: string,
        state: string,
        zip: string,
        country: string,
        createdAt: Date,
        updatedAt: Date,
        id ? : string) {
        this.address1 = address1;
        this.address2 = address2;
        this.city = city;
        this.state = state;
        this.zip = zip;
        this.country = country;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
        this.id = id;
    }

    get getAddress1(): string {
        return this.address1;
    }

    get getAddress2(): string {
        return this.address2;
    }

    get getCity(): string {
        return this.city;
    }

    get getState(): string {
        return this.state;
    }

    get getZip(): string {
        return this.zip;
    }

    get getCountry(): string {
        return this.country;
    }

    get getId(): string {
        return this.id;
    }

    get getCreatedAt(): Date {
        return this.createdAt;
    }

    get getUpdatedAt(): Date {
        return this.updatedAt;
    }
}

export default Address;