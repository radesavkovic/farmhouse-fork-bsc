import CardContent from "@mui/material/CardContent";
import Card from "@mui/material/Card";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

import { styled } from "@mui/system";

const CardWrapper = styled(Card)({
  background: "#1B212C",
  marginBottom: 24,
  height: "100%",
});

const nutritionFacts = [
  {
    label: "Daily Return",
    value: 10,
  },
  {
    label: "APR",
    value: "3,650",
  },
  {
    label: "Dev Fee",
    value: 3,
  },
];

export default function NutritionFacts() {
  return (
    <CardWrapper>
      <CardContent>
        <Typography gutterBottom variant="h5" textAlign="center">
          Plant Information
        </Typography>
        <Box paddingTop={3} paddingBottom={2}>
          {nutritionFacts.map((f, index) => (
            <div key={index}>
            <Grid container key={f.label} justifyContent="space-between">
              <Typography gutterBottom>
                {f.label}
              </Typography>
              <Typography gutterBottom>{f.value}%</Typography>
            </Grid>
            <hr />
            </div>
          ))}
        </Box>
      </CardContent>
    </CardWrapper>
  );
}
