import { Select as SelectShad, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'

interface SelectItemProps {
  id: string;
  label: string;
}

interface SelectProps {
  items: SelectItemProps[];
  placeholder: string;
  className?: string;
  setValue: (arg: string) => void;
  value: string;
}

export default function Select({ items, placeholder, className, setValue, value }: SelectProps) {
  const handleValueChange = (newValue: string) => {
    const selectedItem = items.find(item => item.id === newValue);
    if (selectedItem) {
      setValue(selectedItem.id);
    }
  };

  return (
    <div className={` my-1 ${className}`}>
      <SelectShad value={value} onValueChange={handleValueChange}>
        <SelectTrigger className="rounded-md border border-border bg-btn-dark text-start">
          <SelectValue placeholder={placeholder} />
        </SelectTrigger>

        <SelectContent
          className="rounded-md border border-border bg-btn-dark"
          align='center'
        >
          {items && items.map(item => (
            <SelectItem
              key={item.id}
              value={item.id.toString()}
              className='rounded-md text-start transition-colors duration-200 hover:cursor-pointer hover:bg-gray-700'
            >
              {item.label}
            </SelectItem>
          ))}
        </SelectContent>
      </SelectShad>
    </div>
  )
}
