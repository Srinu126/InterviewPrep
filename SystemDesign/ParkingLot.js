/**
 * Design a Parking Lot
 * Single Entry and Exit Gates
 */
let ParkingLot = (() => {
  let instance;
  class ParkingLot {
    constructor(totalSlots, gates) {
      this.totalSlots = totalSlots;
      this.gates = gates;
      this.availableSlots = totalSlots;
      this.parkedVehicles = new Map();
      this.nextSlot = 0;
    }
    parkVehicle(vehicleNumber) {
      if (this.availableSlots <= 0) return "No space available for parking";
      this.parkedVehicles.set(this.nextSlot, vehicleNumber);
      this.availableSlots--;
      return `Vehicle ${vehicleNumber} parked at slot ${this.nextSlot++}`;
    }
    removeVehicle(vehicleNumber) {
      for (let [slot, vehicle] of this.parkedVehicles) {
        if (vehicle === vehicleNumber) {
          this.parkedVehicles.delete(slot);
          this.availableSlots++;
          return `Vehicle ${vehicleNumber} removed from slot ${slot}`;
        }
      }
      return `Vehicle ${vehicleNumber} not found`;
    }
    getAvailableSlots() {
      return this.availableSlots;
    }
  }
  return {
    getInstance: (totalSlots, gates) => {
      if (!instance) {
        instance = new ParkingLot(totalSlots, gates);
      }
      return instance;
    },
  };
})();

const lot = ParkingLot.getInstance(30, [{ entry: true }, { exit: true }]);
console.log(lot.parkVehicle("AP10A 4848"));
console.log(lot.parkVehicle("AP10A 4748"));
console.log(lot.parkVehicle("AP10A 4648"));
console.log(lot.parkVehicle("AP10A 4548"));
console.log(lot.removeVehicle("AP10A 4548"));
console.log(lot.getAvailableSlots());
