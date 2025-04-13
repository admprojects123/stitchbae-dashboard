import React, { useState } from 'react';
import './AddUpdate.css'; // Importing external CSS
import preview from '../../assets/previewimg.png';

const AddUpdate = () => {
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    link: '',
    image: null,
    imagePreview: preview, // Default placeholder path
    shareWith: {
      freeTrial: true,
      extendedTrial: true,
      basic: false,
      standard: false,
      premium: false,
    }
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    if (type === 'checkbox') {
      setFormData({
        ...formData,
        shareWith: {
          ...formData.shareWith,
          [name]: checked,
        },
      });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData({
          ...formData,
          image: file,
          imagePreview: reader.result, // Set uploaded image preview
        });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission
    console.log(formData);
  };

  return (
    <div className="addupdatebiggestcontainer">
      <div className='addupdatetoptitle'>Updates</div>
      <div className="addupdate-container">
        <div className="addupdate-heading">Add Updates</div>
        <form className="addupdate-form" onSubmit={handleSubmit}>
          <div className="addupdateinput-group">
            <input
              type="text"
              name="title"
              placeholder="Add Title"
              value={formData.title}
              onChange={handleChange}
              className="addupdateinput-field"
            />
            <input
              type="text"
              name="content"
              placeholder="Add Content"
              value={formData.content}
              onChange={handleChange}
              className="addupdateinput-field"
            />
          </div>
          
          <div style={{ paddingTop: "25px" }}>
  <span style={{ fontWeight: "500" }}>Upload Image </span> 
  <span className="addupdateoptional-text">(optional)</span>
</div>

    <div className='addupdatefullpreviewflex'>      
          <div className='addupdatetextbuttonflex'> 
            <div className="addupdate-upload-info" style={{paddingLeft:"10px",paddingTop:"10px"}}>Please upload a PDF</div>
            <div className="addupdatefile-upload">
            <label htmlFor="file-upload" className="addupdate-file-upload">
              Choose File
            </label>
            <input
              id="file-upload"
              type="file"
              onChange={handleFileChange}
              accept="image/jpeg,image/png"
              className="add-input" // Hide the default file input
            />
            </div>  
            </div>   
        
          <div className='addupdatepreviewflex'> 
 
            <div className="addupdateimage-preview-container">
              <img src={formData.imagePreview} alt="Preview" className="addupdateimage-preview" />
              </div>
              
            </div>
            

            <div className='addupdatepdfbuttonflex'> 
              
            <div className="circularpdffile-upload-info" style={{paddingLeft:"10px",paddingTop:"10px"}}>Please upload a JPG or PNG, size less than 2mb</div>
            <div className="circularnewspdffile-upload">
            <label htmlFor="file-upload" className="addupdate-file-upload">
              Choose File
            </label>
            <input
              id="file-upload"
              type="file"
              onChange={handleFileChange}
              accept="image/jpeg,image/png"
              className="addupdatepdffile-input" // Hide the default file input
            />
            </div>  
            </div>   
        
          <div className='addupdatepdfpreviewflex'> 
 
            <div className="addupdateimage-preview-containerpdf">
              <img src={formData.imagePreview} alt="Preview" className="addupdateimage-previewpdf" />
              </div>
              
            </div>


            
   
    </div>
          <div className="circularnewscheckbox-group">
            <label style={{fontWeight:"700"}}>Share With</label>
            <div className="circularnewscheckboxes">
              <label>
                <input
                  type="checkbox"
                  name="freeTrial"
                  checked={formData.shareWith.freeTrial}
                  onChange={handleChange}
                /> Free Trial Users
              </label>
              <label>
                <input
                  type="checkbox"
                  name="extendedTrial"
                  checked={formData.shareWith.extendedTrial}
                  onChange={handleChange}
                /> Extended Trial Users
              </label>
              <label>
                <input
                  type="checkbox"
                  name="basic"
                  checked={formData.shareWith.basic}
                  onChange={handleChange}
                /> Basic Users
              </label>
              <label>
                <input
                  type="checkbox"
                  name="standard"
                  checked={formData.shareWith.standard}
                  onChange={handleChange}
                /> Standard Users
              </label>
              <label>
                <input
                  type="checkbox"
                  name="premium"
                  checked={formData.shareWith.premium}
                  onChange={handleChange}
                /> Premium Users
              </label>
            </div>
          </div>
          <button type="submit" className="circularnewssubmit-btn">Post</button>
        </form>
      </div>
    </div>
  );
};

export default AddUpdate;
