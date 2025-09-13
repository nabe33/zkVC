import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { useState } from "react";
import axios from "axios";
import { Card, CardContent, Typography } from "@mui/material";
import { styled } from "@mui/material";
import { useNavigate } from "react-router-dom";

const Container = styled("div")({
  display: "flex",
  justifyContent: "center",
  alignItems: "flex-start",
  minHeight: "100vh",
  padding: "20px 0",
});

export const Issue: React.FC = () => {
  const navigate = useNavigate();
  const [issuerPrivateKey, setIssuerPrivateKey] = useState("0x1234567890abcdef1234567890abcdef1234567890abcdef1234567890abcdef");
  const [holderAddress, setHolderAddress] = useState("");
  const [driverName, setDriverName] = useState("");
  const [birthDate, setBirthDate] = useState("");
  const [licenseType, setLicenseType] = useState("");
  const [vc, setVc] = useState("");
  const [isRegistering, setIsRegistering] = useState(false);
  const [registrationStatus, setRegistrationStatus] = useState("");
  const [isResolving, setIsResolving] = useState(false);
  const [didDocument, setDidDocument] = useState("");
  const [resolutionStatus, setResolutionStatus] = useState("");
  const [currentDIDInfo, setCurrentDIDInfo] = useState<{
    address: string;
    did: string;
    publicKey: string;
  } | null>(null);
  const [isLoadingDID, setIsLoadingDID] = useState(false);

  const handleIssuerPrivateKeyChange = (
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {
    setIssuerPrivateKey(e.target.value);
  };

  const handleHolderAddressChange = (
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {
    setHolderAddress(e.target.value);
  };

  const handleDriverNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDriverName(e.target.value);
  };

  const handleBirthDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setBirthDate(e.target.value);
  };

  const handleLicenseTypeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLicenseType(e.target.value);
  };

  const handleRegisterDID = async () => {
    setIsRegistering(true);
    setRegistrationStatus("");
    try {
      await axios.post("http://localhost:3001/registerDID");
      setRegistrationStatus("DID登録が完了しました！ブロックチェーンに記録されました。");
    } catch (error) {
      console.error("Error registering DID:", error);
      setRegistrationStatus("DID登録でエラーが発生しました。");
    } finally {
      setIsRegistering(false);
    }
  };

  const handleGetCurrentDID = async () => {
    setIsLoadingDID(true);
    try {
      const res = await axios.get("http://localhost:3001/getCurrentDID");
      setCurrentDIDInfo(res.data);
    } catch (error) {
      console.error("Error getting current DID:", error);
      setCurrentDIDInfo(null);
    } finally {
      setIsLoadingDID(false);
    }
  };

  const handleResolveDID = async () => {
    setIsResolving(true);
    setResolutionStatus("");
    setDidDocument("");
    try {
      const res = await axios.get("http://localhost:3001/resolveDID");
      setDidDocument(JSON.stringify(res.data, null, 2));
      setResolutionStatus("DID解決が成功しました！");
    } catch (error) {
      console.error("Error resolving DID:", error);
      setResolutionStatus("DID解決でエラーが発生しました。DIDが登録されていない可能性があります。");
    } finally {
      setIsResolving(false);
    }
  };

  const handleSubmit = async () => {
    try {
      console.log('VC発行リクエスト送信:', {
        issuerPrivateKey: issuerPrivateKey ? 'あり' : 'なし',
        hodlerAddress: holderAddress,
        driverName,
        birthDate,
        licenseType
      });

      const res = await axios.post("http://localhost:3001/issueVc", {
        issuerPrivateKey,
        hodlerAddress: holderAddress,
        driverName,
        birthDate,
        licenseType,
      });
      setVc(res.data);
    } catch (error: unknown) {
      console.error("Error issuing VC:", error);
      if (error && typeof error === 'object' && 'response' in error) {
        const axiosError = error as { response: { data: { message?: string } | string; status: number } };
        console.error("Response data:", axiosError.response.data);
        console.error("Response status:", axiosError.response.status);
        const errorMessage = typeof axiosError.response.data === 'object' 
          ? axiosError.response.data.message || 'Unknown error'
          : axiosError.response.data;
        setVc(`エラーが発生しました: ${errorMessage}`);
      } else {
        const errorMessage = error instanceof Error ? error.message : 'Unknown error';
        setVc("エラーが発生しました: " + errorMessage);
      }
    }
  };

  const handleVerifyVC = () => {
    if (vc) {
      navigate('/verify', { state: { vc } });
    } else {
      alert('VCが発行されていません。まずVCを発行してください。');
    }
  };

  return (
    <Container>
      <Card sx={{ minWidth: 275 }}>
        <CardContent>
          <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", mb: 2 }}>
            <h1>運転免許証のDIDとVC発行システム</h1>
          </Box>
          
          <Box sx={{ width: 500, maxWidth: "100%", display: "flex", flexDirection: "column", gap: 2, mb: 3 }}>
            <Typography variant="h6" sx={{ color: "primary.main" }}>
              ステップ0: 現在のDID確認
            </Typography>
            <Typography variant="body2" sx={{ color: "text.secondary" }}>
              現在の環境変数で設定されているDID情報を表示します。
            </Typography>
            <Button 
              onClick={handleGetCurrentDID} 
              variant="outlined" 
              disabled={isLoadingDID}
              sx={{ alignSelf: "flex-start" }}
            >
              {isLoadingDID ? "取得中..." : "現在のDID取得"}
            </Button>
            {currentDIDInfo && (
              <Box sx={{ mt: 1, p: 2, backgroundColor: "background.paper", border: "1px solid", borderColor: "divider", borderRadius: 1 }}>
                <Typography variant="subtitle2" sx={{ mb: 1, fontWeight: "bold" }}>
                  現在のDID情報:
                </Typography>
                <Typography variant="body2" sx={{ fontFamily: "monospace", fontSize: "0.75rem", mb: 1 }}>
                  <strong>Address:</strong> {currentDIDInfo.address}
                </Typography>
                <Typography variant="body2" sx={{ fontFamily: "monospace", fontSize: "0.75rem", mb: 1 }}>
                  <strong>DID:</strong> {currentDIDInfo.did}
                </Typography>
                <Typography variant="body2" sx={{ fontFamily: "monospace", fontSize: "0.75rem" }}>
                  <strong>Public Key:</strong> {currentDIDInfo.publicKey}
                </Typography>
              </Box>
            )}
          </Box>

          <Box sx={{ width: 500, maxWidth: "100%", display: "flex", flexDirection: "column", gap: 2, mb: 3 }}>
            <Typography variant="h6" sx={{ color: "primary.main" }}>
              ステップ1: DID登録
            </Typography>
            <Typography variant="body2" sx={{ color: "text.secondary" }}>
              VCを発行する前に、発行者のDIDをブロックチェーンに登録する必要があります。
            </Typography>
            <Button 
              onClick={handleRegisterDID} 
              variant="outlined" 
              disabled={isRegistering}
              sx={{ alignSelf: "flex-start" }}
            >
              {isRegistering ? "登録中..." : "DID登録"}
            </Button>
            {registrationStatus && (
              <Typography 
                variant="body2" 
                sx={{ 
                  color: registrationStatus.includes("エラー") ? "error.main" : "success.main",
                  fontWeight: "bold"
                }}
              >
                {registrationStatus}
              </Typography>
            )}
          </Box>

          <Box sx={{ width: 500, maxWidth: "100%", display: "flex", flexDirection: "column", gap: 2, mb: 3 }}>
            <Typography variant="h6" sx={{ color: "primary.main" }}>
              ステップ2: DID解決（確認）
            </Typography>
            <Typography variant="body2" sx={{ color: "text.secondary" }}>
              登録されたDIDドキュメントをブロックチェーンから取得して確認します。
            </Typography>
            <Button 
              onClick={handleResolveDID} 
              variant="outlined" 
              disabled={isResolving}
              sx={{ alignSelf: "flex-start" }}
            >
              {isResolving ? "解決中..." : "DID解決"}
            </Button>
            {resolutionStatus && (
              <Typography 
                variant="body2" 
                sx={{ 
                  color: resolutionStatus.includes("エラー") ? "error.main" : "success.main",
                  fontWeight: "bold"
                }}
              >
                {resolutionStatus}
              </Typography>
            )}
            {didDocument && (
              <Box sx={{ mt: 1 }}>
                <Typography variant="subtitle2" sx={{ mb: 1 }}>
                  DIDドキュメント:
                </Typography>
                <TextField
                  fullWidth
                  multiline
                  rows={8}
                  value={didDocument}
                  variant="outlined"
                  slotProps={{
                    input: {
                      readOnly: true,
                      style: { fontSize: "0.75rem", fontFamily: "monospace" }
                    }
                  }}
                />
              </Box>
            )}
          </Box>

          <Box sx={{ width: 500, maxWidth: "100%", display: "flex", flexDirection: "column", gap: 2 }}>
            <Typography variant="h6" sx={{ color: "primary.main" }}>
              ステップ3: VC発行
            </Typography>
            <Typography variant="body2" sx={{ color: "text.secondary", mb: 1 }}>
              テスト用の秘密鍵がデフォルトで入力されています。そのまま使用するか、独自の秘密鍵に変更してください。
            </Typography>
            <TextField
              fullWidth
              label="発行者の秘密鍵（運転免許センター）"
              id="issuerPrivateKey"
              type="password"
              value={issuerPrivateKey}
              onChange={handleIssuerPrivateKeyChange}
              placeholder="0x..."
              helperText="デフォルト: テスト用秘密鍵 (0x1234...)"
            />
            <TextField
              fullWidth
              label="VC保有者のアドレス（運転者）"
              id="holderAddress"
              value={holderAddress}
              onChange={handleHolderAddressChange}
              placeholder="0x..."
            />
            <TextField
              fullWidth
              label="運転者氏名"
              id="driverName"
              value={driverName}
              onChange={handleDriverNameChange}
              placeholder="山田太郎"
            />
            <TextField
              fullWidth
              label="生年月日"
              id="birthDate"
              type="date"
              value={birthDate}
              onChange={handleBirthDateChange}
              InputLabelProps={{
                shrink: true,
              }}
              slotProps={{
                htmlInput: {
                  placeholder: "YYYY-MM-DD"
                }
              }}
            />
            <TextField
              fullWidth
              label="免許種類"
              id="licenseType"
              value={licenseType}
              onChange={handleLicenseTypeChange}
              placeholder="普通自動車第一種運転免許"
            />
            <Button onClick={handleSubmit} variant="contained">
              運転免許証VC発行
            </Button>
          </Box>
          
          <Box sx={{ width: 500, maxWidth: "100%", display: "flex", flexDirection: "column", gap: 2, mb: 3 }}>
            <h2>発行された運転免許証VC</h2>
            <Typography component="pre" sx={{ wordBreak: "break-all", fontSize: "0.875rem", mb: 2, whiteSpace: "pre-wrap", fontFamily: "monospace" }}>
              {vc ? JSON.stringify(JSON.parse(decodeURIComponent(escape(atob(vc.split('.')[1])))), null, 2) : ''}
            </Typography>
          </Box>

          {vc && (
            <Box sx={{ width: 500, maxWidth: "100%", display: "flex", flexDirection: "column", gap: 2 }}>
              <Typography variant="h6" sx={{ color: "primary.main" }}>
                ステップ4: VC検証
              </Typography>
              <Typography variant="body2" sx={{ color: "text.secondary" }}>
                発行されたVCを検証ページで確認します。
              </Typography>
              <Button 
                onClick={handleVerifyVC} 
                variant="contained" 
                color="secondary"
                sx={{ alignSelf: "flex-start" }}
              >
                VC検証ページへ移動
              </Button>
            </Box>
          )}
        </CardContent>
      </Card>
    </Container>
  );
};
