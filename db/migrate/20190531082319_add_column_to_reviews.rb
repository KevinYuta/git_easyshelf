class AddColumnToReviews < ActiveRecord::Migration[5.2]
  def change
    add_column :reviews, :neme, :string
    add_column :reviews, :authoer, :string
    add_column :reviews, :introduction, :text
    add_column :reviews, :image_url, :string
  end
end
