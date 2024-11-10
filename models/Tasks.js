class Tasks {
    constructor(name, description, category, start_time, end_time) {
        const timestamp = new Date().getTime();
        const random = Math.floor(Math.random() * 1000);
        this.id = timestamp + "" + random.toString().padStart(3, '0');
        this.name = name;
        this.description = description;
        this.category = category;
        this.start_time = start_time || null; // Initialize start_time, default to null if not provided
        this.end_time = end_time || null; // Initialize end_time, default to null if not provided
        this.timestamp = new Date().getTime(); // Initialize timestamp with the current time
    }
}

module.exports = Tasks;