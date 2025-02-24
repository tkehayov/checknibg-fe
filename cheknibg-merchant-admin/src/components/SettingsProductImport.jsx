import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import TextField from "@mui/material/TextField";
import { useFormik } from "formik";
import * as yup from "yup";
import { Box, Button } from "@mui/material";
import { MerchantSettingsApi } from "../api/merchant-settings";
import { useEffect, useState } from "react";
import { SnackBar } from "./SnackBar";
import { UserApi } from "../api/user-api";

const validationSchema = yup.object({
  importUrlText: yup.string().when("radios", ([radios], schema) => {
    if (radios === "urlImport") {
      return yup.string().url("Невалиден URL").required("Невалиден URL");
    }
    return schema;
  }),
});

export function SettingsProductImport() {
  const [urlConfig, setUrl] = useState({});
  const [defaultCheck, setDefaultCheck] = useState("");
  const [openSnackBar, setOpenSnackBar] = useState(false);
  const [merchantId, setMerchantId] = useState("");

  async function fetchMerchantId() {
    const merchantIdResponse = await UserApi.getMerchantId();
    if (merchantIdResponse.data !== "") {
      setMerchantId(merchantIdResponse);
    }
  }

  const formik = useFormik({
    initialValues: {
      importUrlText: urlConfig.url,
      radios: defaultCheck,
    },
    validationSchema: validationSchema,
    enableReinitialize: true,
    onSubmit: (values) => {
      if (
        Object.keys(urlConfig).length === 0 &&
        values.radios !== "urlImport"
      ) {
        return;
      }

      if (
        (urlConfig.url === "" || Object.keys(urlConfig).length === 0) &&
        values.radios === "urlImport"
      ) {
        createMerchantUrlImportSettings(values.importUrlText, merchantId);
        return;
      }

      if (urlConfig.id !== "" && values.radios === "urlImport") {
        updateMerchantUrlImportSettings(
          values.importUrlText,
          merchantId,
          urlConfig.id
        );
      }

      if (urlConfig.id && values.radios !== "urlImport") {
        deleteMerchantUrlImportSettings(urlConfig.id);
      }
    },
  });

  async function createMerchantUrlImportSettings(url, merchantId) {
    await MerchantSettingsApi.createMerchantUrlImportSettings(
      url,
      merchantId
    ).then((response) => {
      setUrl(response);
      setOpenSnackBar(true);
    });
  }

  async function updateMerchantUrlImportSettings(url, merchantId, id) {
    await MerchantSettingsApi.updateMerchantUrlImportSettings(
      url,
      merchantId,
      id
    ).then((a) => {
      setOpenSnackBar(true);
    });
  }

  async function deleteMerchantUrlImportSettings(id) {
    await MerchantSettingsApi.deleteMerchantUrlImportSettings(id).then((a) => {
      setUrl({});
      setOpenSnackBar(true);
    });
  }

  async function getMerchantUrlImportSettings() {
    const urlConfigResponse =
      await MerchantSettingsApi.getMerchantUrlImportSettings(merchantId);

    if (urlConfigResponse) {
      setUrl(urlConfigResponse);
    }
    if (urlConfigResponse.url) {
      setDefaultCheck("urlImport");
      return;
    }
    setDefaultCheck("fileImport");
  }

  useEffect(() => {
    const fetchData = async () => {
      fetchMerchantId();
      getMerchantUrlImportSettings();
    };
    fetchData();
  }, [merchantId]);

  return (
    <div>
      <SnackBar
        open={openSnackBar}
        setOpenSnackBar={setOpenSnackBar}
        message={"Настройките бяха запазени успешно"}
        severity={"success"}
      />

      <form onSubmit={formik.handleSubmit}>
        <RadioGroup
          aria-labelledby="demo-radio-buttons-group-label"
          name="radios"
        >
          <FormControlLabel
            value="fileImport"
            control={<Radio color="secondary" />}
            label="File Import - добавяте ръчно file с продукти"
            checked={defaultCheck === "fileImport"}
            onChange={(e) => {
              setDefaultCheck("fileImport");
              formik.handleChange(e);
            }}
          />
          <FormControlLabel
            value="urlImport"
            control={<Radio color="secondary" />}
            checked={defaultCheck === "urlImport"}
            label="URL Import - задавате url с продукти и системата всеки ден автоматично ще импортне продуктите"
            onChange={(e) => {
              setDefaultCheck("urlImport");
              formik.handleChange(e);
            }}
          />
        </RadioGroup>
        {defaultCheck === "urlImport" && (
          <TextField
            fullWidth
            name="importUrlText"
            color="secondary"
            type="text"
            variant="filled"
            label="URL"
            value={formik.values.importUrlText || ""}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={
              formik.touched.importUrlText &&
              Boolean(formik.errors.importUrlText)
            }
            helperText={
              formik.touched.importUrlText && formik.errors.importUrlText
            }
          />
        )}

        <Box display="flex" justifyContent="end" mt="20px">
          <Button type="submit" color="secondary" variant="contained">
            Запази
          </Button>
        </Box>
      </form>
    </div>
  );
}
