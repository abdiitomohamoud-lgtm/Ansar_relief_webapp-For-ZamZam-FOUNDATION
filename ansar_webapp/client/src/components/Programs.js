import React, { useState } from 'react';
import {
  Container,
  Grid,
  Card,
  CardContent,
  Typography,
  Button,
  Box,
  Tabs,
  Tab,
  useTheme,
} from '@mui/material';
import { useCategories, usePrograms } from '../hooks/useApi';
import { LoadingState } from './common/LoadingState';

const Programs = () => {
  const theme = useTheme();
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedSubcategory, setSelectedSubcategory] = useState(null);

  const { data: categories, loading: categoriesLoading, error: categoriesError } = useCategories();
  const { data: programs, loading: programsLoading, error: programsError } = usePrograms(
    selectedCategory,
    selectedSubcategory
  );

  const handleCategoryChange = (event, newValue) => {
    setSelectedCategory(newValue);
    setSelectedSubcategory(null);
  };

  const handleSubcategoryChange = (event, newValue) => {
    setSelectedSubcategory(newValue);
  };

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Typography variant="h4" component="h2" gutterBottom align="center">
        Our Programs
      </Typography>

      <LoadingState loading={categoriesLoading} error={categoriesError}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider', mb: 3 }}>
          <Tabs
            value={selectedCategory}
            onChange={handleCategoryChange}
            variant="scrollable"
            scrollButtons="auto"
            aria-label="program categories"
          >
            <Tab label="All" value={null} />
            {categories?.map((category) => (
              <Tab
                key={category._id}
                label={category.name}
                value={category._id}
              />
            ))}
          </Tabs>
        </Box>
      </LoadingState>

      {selectedCategory && (
        <LoadingState loading={categoriesLoading} error={categoriesError}>
          <Box sx={{ borderBottom: 1, borderColor: 'divider', mb: 3 }}>
            <Tabs
              value={selectedSubcategory}
              onChange={handleSubcategoryChange}
              variant="scrollable"
              scrollButtons="auto"
              aria-label="program subcategories"
            >
              <Tab label="All" value={null} />
              {categories
                ?.find((cat) => cat._id === selectedCategory)
                ?.subcategories.map((sub) => (
                  <Tab
                    key={sub._id}
                    label={sub.name}
                    value={sub._id}
                  />
                ))}
            </Tabs>
          </Box>
        </LoadingState>
      )}

      <LoadingState loading={programsLoading} error={programsError}>
        <Grid container spacing={3}>
          {programs?.map((program) => (
            <Grid item xs={12} sm={6} md={4} key={program._id}>
              <Card
                sx={{
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  transition: 'transform 0.2s',
                  '&:hover': {
                    transform: 'translateY(-4px)',
                  },
                }}
              >
                <CardContent>
                  <Typography variant="h6" component="h3" gutterBottom>
                    {program.name}
                  </Typography>
                  <Typography
                    variant="body2"
                    color="text.secondary"
                    paragraph
                    sx={{
                      display: '-webkit-box',
                      WebkitLineClamp: 3,
                      WebkitBoxOrient: 'vertical',
                      overflow: 'hidden',
                    }}
                  >
                    {program.description}
                  </Typography>
                  <Box sx={{ mt: 'auto' }}>
                    <Button
                      variant="contained"
                      color="primary"
                      fullWidth
                      sx={{
                        mt: 2,
                        backgroundColor: theme.palette.primary.main,
                        '&:hover': {
                          backgroundColor: theme.palette.primary.dark,
                        },
                      }}
                    >
                      Learn More
                    </Button>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </LoadingState>
    </Container>
  );
};

export default Programs; 