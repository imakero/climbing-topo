import { ComponentPropsWithoutRef, forwardRef } from "react";

type MultiSelectProps = ComponentPropsWithoutRef<"select"> & {
  tags: WithId<Tag>[];
};

const MultiSelect = forwardRef<HTMLSelectElement, MultiSelectProps>(
  function MultiSelect({ tags, ...props }: MultiSelectProps, ref) {
    return (
      <select multiple id="tags" {...props} ref={ref}>
        {tags.map((tag) => (
          <option key={tag.id} value={tag.name}>
            {tag.name}
          </option>
        ))}
      </select>
    );
  },
);

export default MultiSelect;
