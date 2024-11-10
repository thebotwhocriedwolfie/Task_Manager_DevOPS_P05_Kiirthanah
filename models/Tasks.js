class Tasks {
    constructor(name, description, category, start_time, end_time) {
        const timestamp = new Date().getTime();
        const random = Math.floor(Math.random() * 1000);
        this.id = timestamp + "" + random.toString().padStart(3, '0');
        this.name = name;
        this.description = description;
        this.category = category;
        this.start_time = start_time || null;
        this.end_time = end_time || null;
        this.timestamp = new Date().getTime();
    }
}

module.exports = Tasks;
