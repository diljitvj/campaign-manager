// Template engine generates html templates
const TemplateEngine = {
  // Create template for a row campaign
  renderCampaignRow: (campaign, isSelected) => {
    return `<tr data-campaign-id="${campaign._id}">
        <td class="align-center">
            <input class="checkbox" type="checkbox" ${
              isSelected ? "checked" : ""
            } id="select-all" onclick=Store.toggleSelection('${
      campaign._id
    }') />
        </td>
        <td class="name">${campaign.name}</td>
        <td>${campaign.type}</td>
        <td class="last-saved">${
          campaign.lastSaved ? Utils.formatTime(campaign.lastSaved) : "N/A"
        }</td>
        <td class="align-center" data-campaign-id="${campaign._id}">
          <button class="btn btn-blue" onclick=Campaign.showEditModal('${
            campaign._id
          }')>Update</button>
          <button class="btn btn-red" onclick=Store.deleteCampaign('${
            campaign._id
          }')>Delete</button>
        </td>
    </tr>`;
  },

  // Create template for one pagination button
  renderPaginationButton: (pageNumber, active) => {
    return `<button class="btn btn-outline-blue ${
      active ? "active" : ""
    }" data-page-number=${pageNumber} onclick=Store.changeCurrentPage(${pageNumber})>${pageNumber}</button>`;
  },

  // Create template for Edit campaign modal
  renderEditCampaignModal: campaign => {
    return `<div class="modal edit-campaign-modal">
      <div class="form-group">
        <input id="name" type="text" value="${campaign.name}"/>
      </div>
      <div class="form-group">
      <input type="text" disabled value="${campaign.type}"/>
      </div>
      <div class="form-group align-right">
        <button class="btn btn-red" onclick="Campaign.onUpdate('${
          campaign._id
        }')">Save</button>
        <button class="btn btn-blue" onclick="Campaign.closeEditModal()">Cancel</button>
      </div>
    </div>`;
  }
};
