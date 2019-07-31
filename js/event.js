// This is the event module
var EventMod = {
  // List of events and its handlers are stored here
  events: {
    changePage: { handlers: [] },
    deleteCampaign: { handlers: [] },
    editCampaign: { handlers: [] },
    search: { handlers: [] },
    toggleSelection: { handlers: [] }
  },
  // Emits an event with an optional payload
  emit: function(eventType, payload) {
    const event = this.events[eventType];

    if (event) event.handlers.forEach(handler => handler(payload));
  },
  // Subscribe to an event with a handler
  on: function(eventType, handler) {
    if (!this.events[eventType]) {
      this.events[eventType] = { handlers: [] };
    }
    this.events[eventType].handlers.push(handler);
  }
};
