import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { Card, CardContent, styled, Typography } from "@mui/material";
import { useState, useEffect } from "react";
import axios from "axios";
import { Link, useLocation } from "react-router-dom";

const Container = styled("div")({
  display: "flex",
  justifyContent: "center",
  alignItems: "flex-start",
  minHeight: "100vh",
  padding: "20px 0",
});

interface LocationState {
  vc: string;
}

type VerificationResult = 'unverified' | 'success' | 'failure';

export const VerifyVC: React.FC = () => {
  const location = useLocation();
  const [vc, setVc] = useState("");
  const [result, setResult] = useState<VerificationResult>('unverified');
  const [decodedVC, setDecodedVC] = useState<{
    iss: string;
    credentialSubject?: {
      id: string;
      driverLicense?: {
        driverName: string;
        birthDate: string;
        licenseType: string;
      };
    };
    issuanceDate: string;
  } | null>(null);

  const decodeJWT = (jwt: string) => {
    try {
      const parts = jwt.split('.');
      if (parts.length !== 3) {
        return null;
      }
      const payload = parts[1];
      
      // Base64URLデコードの改善（パディング追加）
      let base64 = payload.replace(/-/g, '+').replace(/_/g, '/');
      while (base64.length % 4) {
        base64 += '=';
      }
      
      // UTF-8デコードの改善
      const binaryString = atob(base64);
      const bytes = new Uint8Array(binaryString.length);
      for (let i = 0; i < binaryString.length; i++) {
        bytes[i] = binaryString.charCodeAt(i);
      }
      
      const decodedString = new TextDecoder('utf-8').decode(bytes);
      const decoded = JSON.parse(decodedString);
      return decoded;
    } catch (error) {
      console.error('JWT decode error:', error);
      return null;
    }
  };

  useEffect(() => {
    const state = location.state as LocationState;
    if (state?.vc) {
      setVc(state.vc);
      const decoded = decodeJWT(state.vc);
      setDecodedVC(decoded);
    }
  }, [location.state]);
  
  const handleVcChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newVc = e.target.value;
    setVc(newVc);
    if (newVc) {
      const decoded = decodeJWT(newVc);
      setDecodedVC(decoded);
    } else {
      setDecodedVC(null);
    }
  };
  
  const handleSubmit = async () => {
    try {
      const res = await axios.post("http://localhost:3000/verifyVc", {
        vc,
      });
      setResult(res.data ? 'success' : 'failure');
    } catch (error) {
      console.error("Error verifying VC:", error);
      setResult('failure');
    }
  };
  return (
    <Container>
      <Card sx={{ minWidth: 275 }}>
        <CardContent>
          <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 2 }}>
            <h1>運転免許証VC検証</h1>
            <Button component={Link} to="/" variant="text">
              トップページに戻る
            </Button>
          </Box>
          <Box sx={{ width: 500, maxWidth: "100%", display: "flex", flexDirection: "column", gap: 2 }}>
            <TextField
              fullWidth
              label="運転免許証VC"
              id="vc"
              value={vc}
              onChange={handleVcChange}
              multiline
              rows={4}
            />
          </Box>
          
          {decodedVC && (
            <>
              <Box sx={{ width: 500, maxWidth: "100%", display: "flex", flexDirection: "column", gap: 2, mb: 3 }}>
                <Typography variant="h6" sx={{ color: "primary.main" }}>
                  運転免許証の内容
                </Typography>
                
                <Box sx={{ p: 2, backgroundColor: "background.paper", border: "1px solid", borderColor: "divider", borderRadius: 1 }}>
                  <Typography variant="subtitle2" sx={{ mb: 1, fontWeight: "bold" }}>
                    発行者: 
                  </Typography>
                  <Typography variant="body2" sx={{ fontFamily: "monospace", fontSize: "0.75rem", mb: 2 }}>
                    {decodedVC.iss}
                  </Typography>
                  
                  <Typography variant="subtitle2" sx={{ mb: 1, fontWeight: "bold" }}>
                    受信者:
                  </Typography>
                  <Typography variant="body2" sx={{ fontFamily: "monospace", fontSize: "0.75rem", mb: 2 }}>
                    {decodedVC.credentialSubject?.id}
                  </Typography>
                  
                  <Typography variant="subtitle2" sx={{ mb: 1, fontWeight: "bold" }}>
                    運転免許証情報:
                  </Typography>
                  <Typography variant="body2" sx={{ fontSize: "0.875rem", mb: 1 }}>
                    運転者名: {decodedVC.credentialSubject?.driverLicense?.driverName}
                  </Typography>
                  <Typography variant="body2" sx={{ fontSize: "0.875rem", mb: 1 }}>
                    生年月日: {decodedVC.credentialSubject?.driverLicense?.birthDate}
                  </Typography>
                  <Typography variant="body2" sx={{ fontSize: "0.875rem", mb: 2 }}>
                    免許種類: {decodedVC.credentialSubject?.driverLicense?.licenseType}
                  </Typography>
                  
                  <Typography variant="subtitle2" sx={{ mb: 1, fontWeight: "bold" }}>
                    発行日時:
                  </Typography>
                  <Typography variant="body2" sx={{ fontSize: "0.875rem" }}>
                    {decodedVC.issuanceDate ? new Date(decodedVC.issuanceDate).toLocaleString('ja-JP') : '不明'}
                  </Typography>
                </Box>
              </Box>
              
              <Box sx={{ width: 500, maxWidth: "100%", display: "flex", justifyContent: "center", mt: 2, mb: 3 }}>
                <Button onClick={handleSubmit} variant="contained" size="large">
                  検証実行
                </Button>
              </Box>
            </>
          )}
          
          <h2>運転免許証検証結果</h2>
          <Typography 
            variant="h6" 
            sx={{ 
              color: result === 'success' ? "success.main" : result === 'failure' ? "error.main" : "text.secondary",
              fontWeight: "bold"
            }}
          >
            {result === 'success' ? "✅ 検証成功" : result === 'failure' ? "❌ 検証失敗" : "⏳ 未検証"}
          </Typography>
        </CardContent>
      </Card>
    </Container>
  );
};
