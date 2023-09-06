class CreateCouponCodes < ActiveRecord::Migration[6.0]
  def change
    create_table :coupon_codes do |t|
      t.string :code
      t.boolean :redeemed

      t.timestamps
    end
  end
end
