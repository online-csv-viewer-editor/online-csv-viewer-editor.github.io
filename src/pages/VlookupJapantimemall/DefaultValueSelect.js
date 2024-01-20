const DefaultValueSelect = () => {

  const DeliveryFormControl = () => {

    const handleSelectChange = (event) => {

    };

    return (
      <FormControl>
        <InputLabel variant="standard" htmlFor="uncontrolled-native-배송방법">
          배송방법
        </InputLabel>
        <NativeSelect
          defaultValue={'ship'}
          onChange={}
          inputProps={{
            name: '배송방법',
            id: 'uncontrolled-native-배송방법',
          }}
        >
          <option value={'airplane'}>항공특송</option>
          <option value={'ship'}>해운특송</option>
        </NativeSelect>
      </FormControl>
    );
  };

  return (
    <Box sx={{ minWidth: 120 }}>
      <DeliveryFormControl />
    </Box>
  );
}

export default DefaultValueSelect;