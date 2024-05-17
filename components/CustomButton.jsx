import { Text, TouchableOpacity } from 'react-native';

function CustomButton({
  title, onPress, containerStyles, textStyls: textStyles, isLoading,
}) {
  return (
    <TouchableOpacity
      activeOpacity={0.7}
      className={`bg-secondary rounded-xl min-h-[62px] justify-center items-center ${containerStyles} ${isLoading ? 'opacity-50' : ''}`}
      disabled={isLoading}
      onPress={onPress}
    >
      <Text className={`text-primary text-lg font-psemiblod ${textStyles}`}>
        {title}
      </Text>
    </TouchableOpacity>
  );
}

export default CustomButton;
