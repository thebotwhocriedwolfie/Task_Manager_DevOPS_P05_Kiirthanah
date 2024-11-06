class Task {
    constructor(name, description, category, start_time, end_time) {
        this.name = name;
        this.description = description;
        this.category = category; 
        this.start_time = start_time || null; // Initialize start_time, default to null if not provided
        this.end_time = end_time || null; // Initialize end_time, default to null if not provided
        this.timestamp = new Date().getTime(); // Initialize timestamp with the current time
    }
}

module.exports = { Task };