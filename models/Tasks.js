class Tasks {
    constructor(name, description, start_time, end_time, owner) {
        this.name = name;
        this.description = description;
        this.start_time = start_time;
        this.end_time = end_time;
        this.owner = owner;
        const timestamp = new Date().getTime();
        const random = Math.floor(Math.random() * 1000);
        this.id = timestamp + "" + random.toString().padStart(3, '0');
    }
}

module.exports = Tasks;
