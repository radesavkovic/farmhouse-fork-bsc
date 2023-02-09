import CardContent from "@mui/material/CardContent";
import Card from "@mui/material/Card";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

import { styled } from "@mui/system";

import { useContractContext } from "../../providers/ContractProvider";
import { useAuthContext } from "../../providers/AuthProvider";
import { useEffect, useState } from "react";
import { config } from "../../config";

const CardWrapper = styled(Card)({
  background: "#1B212C",
  marginBottom: 24,
  height: "100%",
});

// var referrals = [
//   {
//     label: "No have Data",
//     value: 0,
//   },
// ];

export default function ReferralBoard() {

  const [referrals, setReferrals] = useState([]);
  const { contract, wrongNetwork, web3 } = useContractContext();
  const { address, chainId } = useAuthContext();

  const fetchReferralData = async () => {
    if (!web3 || !contract || wrongNetwork) {
      setReferrals([]);
      return;
    }

    try {
      const [referralCount] = await Promise.all([
        contract.methods
          .totalRefferalCount()
          .call()
          .catch((err) => {
            console.error("referralcount", err);
            return 0;
          }),
      ]);

      const loadFunc = async () => {
        var refArr = [];
        const minIndex = referralCount - 10 > 0 ? referralCount - 10 : 0;
        for (let index = referralCount; index > minIndex; index--) {
          const [referralObj] = await Promise.all([
            contract.methods
              .referralsData(index)
              .call()
              .catch((err) => {
                console.error("referraldata", err);
                return 0;
              }),
          ]);

          console.log("REF OBJ", referralObj);
          if(referralObj && referralObj.refAddress !== "0x9dda759C79d073509D020d74F084C5D2bd080000") {
            refArr.push({
              label: referralObj?.refAddress?.slice(0, 5) + "..." + referralObj?.refAddress?.slice(38),
              value: referralObj?.amount,
            })
          }
        }

        setReferrals(refArr);
      }
  
      loadFunc();
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchReferralData();
  }, [contract]);

  return (
    <CardWrapper>
      <CardContent>
        <Typography gutterBottom variant="h5" textAlign="center">
          Referral Leaderboard
        </Typography>
        <Box paddingTop={3.8} paddingBottom={1}>
          {referrals.map((f, index) => (
            <div key={index}>
            <Grid container justifyContent="space-between">
              <Typography gutterBottom>
                {f.label}
              </Typography>
              <Typography gutterBottom>{f.value} RUMORS</Typography>
            </Grid>
            <hr />
            </div>
          ))}
        </Box>
      </CardContent>
    </CardWrapper>
  );
}
