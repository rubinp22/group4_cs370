import { useState } from 'react';
import { Stack, Typography, Button, ButtonGroup, Paper } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import MuiLink from '@mui/material/Link';
import ToolBar from '../components/ToolBar';

const dietPlans = {
  paleo: {
    title: 'Paleo Diet Plan',
    meals: [
      '  Breakfast: Scrambled Eggs with Spinach and Avocado',
      '  Lunch: Grilled Chicken Salad with Olive Oil',
      '  Snack: Mixed Nuts',
      '  Dinner: Salmon with Sweet Potato & Veggies'
    ]
  },
  vegan: {
    title: 'Vegan Diet Plan',
    meals: [
      '  Breakfast: Smoothie with Spinach, Banana, and Almond Milk',
      '  Lunch: Quinoa Salad with Avocado, Chickpeas, and Lemon Dressing',
      '  Snack: Hummus with Carrot Sticks',
      '  Dinner: Vegan Tacos with Black Beans, Corn, Avocado, and Salsa'
    ]
  },
  vegetarian: {
    title: 'Vegetarian Diet Plan',
    meals: [
      '  Breakfast: Oatmeal with Berries and Almonds',
      '  Lunch: Vegetable Stir-Fry with Tofu',
      '  Snack: Greek Yogurt with Honey',
      '  Dinner: Vegetable Lasagna'
    ]
  },
  mediterranean: {
    title: 'Mediterranean Diet Plan',
    meals: [
      '  Breakfast: Greek Yogurt with Honey and Walnuts',
      '  Lunch: Falafel with Hummus and Pita',
      '  Snack: Olives and Cheese',
      '  Dinner: Stuffed Zucchini'
    ]
  },
  keto: {
    title: 'Keto Diet Plan',
    meals: [
      '  Breakfast: Scrambled Eggs with Red Pepper, Spinach, Mushrooms, Cheese',
      '  Lunch: Caesar Salad with Grilled Chicken',
      '  Snack: Cheese Stick(s)',
      '  Dinner: Steak with Sautéed Mushrooms'
    ]
  }
};

const DietButtons = ({ setSelectedPlan }) => (
  <ButtonGroup variant="contained">
    {['paleo', 'vegan', 'keto', 'vegetarian', 'mediterranean'].map(plan => (
      <Button key={plan} onClick={() => setSelectedPlan(plan)}>
        {dietPlans[plan].title.split(' ')[0]} {/* Extract first word of title for the button */}
      </Button>
    ))}
  </ButtonGroup>
);

function DietPlan() {
  const [selectedPlan, setSelectedPlan] = useState('none');

  return (
    <>
      <ToolBar /> {/* add new elements */}
      <Stack spacing={4} margin={4}>
        <Typography variant="h2">Diet Plans</Typography>

      {/* Diet Buttons Component */}
      <DietButtons setSelectedPlan={setSelectedPlan} />

      <Paper elevation={3} sx={{ padding: 3 }}>
        <Typography variant="h4" gutterBottom>
          {dietPlans[selectedPlan]?.title}
        </Typography>
        <Stack spacing={1}>
          {dietPlans[selectedPlan]?.meals.map((meal, index) => (
            <Typography key={index}>• {meal}</Typography>
          ))}
        </Stack>
      </Paper>

      <MuiLink to="../HomePage" component={RouterLink}>
        Back to Home
      </MuiLink>
    </Stack>
    </>
  );
}

export default DietPlan;