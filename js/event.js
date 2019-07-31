var EventMod = {
  events: {
    changePage: { handlers: [] },
    deleteCampaign: { handlers: [] },
    editCampaign: { handlers: [] },
    search: { handlers: [] },
    toggleSelection: { handlers: [] }
  },
  emit: function(eventType, payload) {
    const event = this.events[eventType];

    if (event) event.handlers.forEach(handler => handler(payload));
  },
  on: function(eventType, handler) {
    if (!this.events[eventType]) {
      this.events[eventType] = { handlers: [] };
    }
    this.events[eventType].handlers.push(handler);
  }
};
