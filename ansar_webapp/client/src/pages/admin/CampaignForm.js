import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { 
  createCampaign, 
  updateCampaign, 
  getCampaignById 
} from '../../redux/slices/campaignSlice';
import { 
  TextField, 
  Button, 
  FormControl, 
  InputLabel, 
  Select, 
  MenuItem, 
  FormHelperText,
  Grid,
  Paper,
  Typography,
  Box,
  Chip,
  OutlinedInput,
  Checkbox,
  FormControlLabel,
  CircularProgress
} from '@mui/material';
import { Editor } from '@tinymce/tinymce-react';
import { toast } from 'react-toastify';
import ImageUpload from '../../components/admin/ImageUpload';
import { getCategories } from '../../redux/slices/categorySlice';

const CampaignForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  
  const categoriesState = useSelector((state) => state.categories);
  const categories = categoriesState?.categories || [];
  // Debug: log the categories state
  if (!categoriesState) {
    // eslint-disable-next-line no-console
    console.error('Redux state.categories is undefined!');
  }
  const campaignsState = useSelector((state) => state.campaigns);
  const loading = campaignsState?.loading || false;
  const error = campaignsState?.error || null;
  if (!campaignsState) {
    // eslint-disable-next-line no-console
    console.error('Redux state.campaigns is undefined!');
  }
  
  const [formData, setFormData] = useState({
    title: '',
    slug: '',
    description: '',
    content: '',
    goal_amount: 0,
    start_date: '',
    end_date: '',
    featured_image: '',
    category_id: '',
    is_featured: false,
    is_active: true,
    tags: []
  });
  
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState('');
  const [formErrors, setFormErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    dispatch(getCategories());
    
    if (id) {
      dispatch(getCampaignById(id))
        .unwrap()
        .then(campaign => {
          setFormData({
            ...campaign,
            start_date: campaign.start_date ? campaign.start_date.split('T')[0] : '',
            end_date: campaign.end_date ? campaign.end_date.split('T')[0] : '',
          });
          if (campaign.featured_image) {
            setImagePreview(campaign.featured_image);
          }
        })
        .catch(error => {
          toast.error('Error loading campaign: ' + error.message);
        });
    }
  }, [dispatch, id]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value
    });
    
    // Auto-generate slug from title
    if (name === 'title') {
      setFormData(prev => ({
        ...prev,
        slug: value.toLowerCase().replace(/\s+/g, '-').replace(/[^\w-]+/g, '')
      }));
    }
    
    // Clear error when field is updated
    if (formErrors[name]) {
      setFormErrors({
        ...formErrors,
        [name]: ''
      });
    }
  };

  const handleEditorChange = (content) => {
    setFormData({
      ...formData,
      content
    });
  };

  const handleImageChange = (file) => {
    setImageFile(file);
    setImagePreview(URL.createObjectURL(file));
  };

  const validateForm = () => {
    const errors = {};
    
    if (!formData.title) errors.title = 'Title is required';
    if (!formData.slug) errors.slug = 'Slug is required';
    if (!formData.description) errors.description = 'Description is required';
    if (!formData.content) errors.content = 'Content is required';
    if (!formData.goal_amount) errors.goal_amount = 'Goal amount is required';
    if (!formData.category_id) errors.category_id = 'Category is required';
    
    if (!id && !imageFile) errors.featured_image = 'Featured image is required';
    
    return errors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const errors = validateForm();
    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      const formPayload = new FormData();
      
      // Append all form data
      Object.keys(formData).forEach(key => {
        if (key !== 'featured_image' && key !== 'tags') {
          formPayload.append(key, formData[key]);
        }
      });
      
      // Append tags as JSON string
      if (formData.tags.length) {
        formPayload.append('tags', JSON.stringify(formData.tags));
      }
      
      // Append image if changed
      if (imageFile) {
        formPayload.append('featured_image', imageFile);
      }
      
      if (id) {
        await dispatch(updateCampaign({ id, formData: formPayload })).unwrap();
        toast.success('Campaign updated successfully');
      } else {
        await dispatch(createCampaign(formPayload)).unwrap();
        toast.success('Campaign created successfully');
      }
      
      navigate('/admin/campaigns');
    } catch (error) {
      toast.error('Error: ' + error.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Paper elevation={3} sx={{ p: 3 }}>
      <Typography variant="h5" component="h1" gutterBottom>
        {id ? 'Edit Campaign' : 'Create New Campaign'}
      </Typography>
      
      <form onSubmit={handleSubmit}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={8}>
            <TextField
              fullWidth
              label="Campaign Title"
              name="title"
              value={formData.title}
              onChange={handleChange}
              error={!!formErrors.title}
              helperText={formErrors.title}
              margin="normal"
              required
            />
            
            <TextField
              fullWidth
              label="Slug"
              name="slug"
              value={formData.slug}
              onChange={handleChange}
              error={!!formErrors.slug}
              helperText={formErrors.slug || 'URL-friendly identifier for the campaign'}
              margin="normal"
              required
            />
            
            <TextField
              fullWidth
              label="Short Description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              error={!!formErrors.description}
              helperText={formErrors.description}
              margin="normal"
              multiline
              rows={3}
              required
            />
            
            <Box sx={{ mt: 3, mb: 3 }}>
              <Typography variant="subtitle1" gutterBottom>
                Campaign Content
              </Typography>
              <Editor
                apiKey="your-tinymce-api-key"
                value={formData.content}
                init={{
                  height: 400,
                  menubar: true,
                  plugins: [
                    'advlist autolink lists link image charmap print preview anchor',
                    'searchreplace visualblocks code fullscreen',
                    'insertdatetime media table paste code help wordcount'
                  ],
                  toolbar:
                    'undo redo | formatselect | bold italic backcolor | \
                    alignleft aligncenter alignright alignjustify | \
                    bullist numlist outdent indent | removeformat | help'
                }}
                onEditorChange={handleEditorChange}
              />
              {formErrors.content && (
                <FormHelperText error>{formErrors.content}</FormHelperText>
              )}
            </Box>
          </Grid>
          
          <Grid item xs={12} md={4}>
            <Box sx={{ mb: 3 }}>
              <Typography variant="subtitle1" gutterBottom>
                Featured Image
              </Typography>
              <ImageUpload
                onImageChange={handleImageChange}
                previewUrl={imagePreview}
                error={formErrors.featured_image}
              />
            </Box>
            
            <TextField
              fullWidth
              label="Goal Amount"
              name="goal_amount"
              type="number"
              value={formData.goal_amount}
              onChange={handleChange}
              error={!!formErrors.goal_amount}
              helperText={formErrors.goal_amount}
              margin="normal"
              required
              InputProps={{
                startAdornment: <Box component="span" sx={{ mr: 1 }}>$</Box>
              }}
            />
            
            <FormControl fullWidth margin="normal" error={!!formErrors.category_id} required>
              <InputLabel>Category</InputLabel>
              <Select
                name="category_id"
                value={formData.category_id}
                onChange={handleChange}
                label="Category"
              >
                {categories.map((category) => (
                  <MenuItem key={category.id} value={category.id}>
                    {category.name}
                  </MenuItem>
                ))}
              </Select>
              {formErrors.category_id && (
                <FormHelperText>{formErrors.category_id}</FormHelperText>
              )}
            </FormControl>
            
            <Grid container spacing={2} sx={{ mt: 1 }}>
              <Grid item xs={6}>
                <TextField
                  fullWidth
                  label="Start Date"
                  name="start_date"
                  type="date"
                  value={formData.start_date}
                  onChange={handleChange}
                  InputLabelProps={{ shrink: true }}
                  margin="normal"
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  fullWidth
                  label="End Date"
                  name="end_date"
                  type="date"
                  value={formData.end_date}
                  onChange={handleChange}
                  InputLabelProps={{ shrink: true }}
                  margin="normal"
                />
              </Grid>
            </Grid>
            
            <Box sx={{ mt: 2 }}>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={formData.is_featured}
                    onChange={handleChange}
                    name="is_featured"
                  />
                }
                label="Featured Campaign"
              />
            </Box>
            
            <Box sx={{ mt: 1 }}>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={formData.is_active}
                    onChange={handleChange}
                    name="is_active"
                  />
                }
                label="Active Campaign"
              />
            </Box>
          </Grid>
          
          <Grid item xs={12}>
            <Box sx={{ mt: 3, display: 'flex', justifyContent: 'flex-end' }}>
              <Button 
                variant="outlined" 
                onClick={() => navigate('/admin/campaigns')}
                sx={{ mr: 2 }}
                disabled={isSubmitting}
              >
                Cancel
              </Button>
              <Button 
                type="submit" 
                variant="contained" 
                color="primary"
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <CircularProgress size={24} />
                ) : id ? (
                  'Update Campaign'
                ) : (
                  'Create Campaign'
                )}
              </Button>
            </Box>
          </Grid>
        </Grid>
      </form>
    </Paper>
  );
};

export default CampaignForm; 