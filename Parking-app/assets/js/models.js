function Parking(id, name, description, address, availableCapacity, totalCapacity, open, percentage)
{
	this.id = id;
	this.name = name;
	this.description = description;
	this.address = address;
	this.availableCapacity = availableCapacity;
	this.totalCapacity = totalCapacity;
	this.open = open;
	this.percentage = percentage;

	// console.log("1. Initialize models.js");
}

function ParkingLocal(id, availableCapacity)
{
	this.id = id;
	this.availableCapacity = availableCapacity;

	// console.log("1. Initialize modules.js");
}